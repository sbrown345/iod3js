///* $Revision: 10602 $ on $Date:: 2010-03-04 22:35:34 -0800 #$ */

//#include <GLES2/gl2platform.h>

//#ifdef __cplusplus
//extern "C" {
//#endif






// Temp (hopefully) GL init code

declare module WebGLDebugUtils {
	function makeDebugContext(ctx: WebGLRenderingContext, nothingInParticular: any, fnForEveryCall: any): WebGLRenderingContext;
	function glFunctionArgsToString(fn: string, args: any[]): WebGLRenderingContext;
}

function logGLCall(functionName: string, args: any[]): void {
	console.error("gl." + functionName + "(" +
		WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
}

function validateNoneOfTheArgsAreUndefined(functionName: string, args: any[]): void {
	for (var ii = 0; ii < args.length; ++ii) {
		if (args[ii] === undefined) {
			debugger;
			console.error("undefined passed to gl." + functionName + "(" +
				WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
		}
		if (typeof args[ii] === "number" && isNaN(args[ii])) {
			debugger;
			console.error("NaN passed to gl." + functionName + "(" +
				WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
		}
	}
}

function logAndValidate(functionName: string, args: any[]): void {
	logGLCall(functionName, args);
	validateNoneOfTheArgsAreUndefined(functionName, args);
}

var canvas = <HTMLCanvasElement> document.createElement( "canvas" );
if ( document.body /*qunit*/ ) {
	document.body.appendChild( canvas );
}

var glOpts = { preserveDrawingBuffer: true }; // todo: set as false
var webglContext = canvas.getContext( "webgl", glOpts ) || canvas.getContext( "experimental-webgl", glOpts );
var gl: WebGLRenderingContext = DEBUG_WEBGL_UTIL ? WebGLDebugUtils.makeDebugContext(webglContext, undefined, logAndValidate) : webglContext;
canvas.width = 640;
canvas.height = 480;


// missing const:
var GL_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FE;





///*
// * This document is licensed under the SGI Free Software B License Version
// * 2.0. For details, see http://oss.sgi.com/projects/FreeB/ .
// */

///*-------------------------------------------------------------------------
// * Data type definitions
// *-----------------------------------------------------------------------*/

//typedef void             GLvoid;
//typedef char             GLchar;
//typedef unsigned int     GLenum;
//typedef unsigned char    GLboolean;
//typedef unsigned int     GLbitfield;
//typedef khronos_int8_t   GLbyte;
//typedef short            GLshort;
//typedef int              GLint;
//typedef int              GLsizei;
//typedef khronos_uint8_t  GLubyte;
//typedef unsigned short   GLushort;
//typedef unsigned int     GLuint;
//typedef khronos_float_t  GLfloat;
//typedef khronos_float_t  GLclampf;
//typedef khronos_int32_t  GLfixed;

///* GL types for handling large vertex buffer objects */
//typedef khronos_intptr_t GLintptr;
//typedef khronos_ssize_t  GLsizeiptr;

///* OpenGL ES core versions */
//var GL_ES_VERSION_2_0                 1

///* ClearBufferMask */
var GL_DEPTH_BUFFER_BIT             = 0x00000100;
var GL_STENCIL_BUFFER_BIT           = 0x00000400;
var GL_COLOR_BUFFER_BIT             = 0x00004000; ///* Boolean */
var GL_FALSE = false;//0;
var GL_TRUE = true;//1; ///* BeginMode */
var GL_POINTS                       = 0x0000;
var GL_LINES                        = 0x0001;
var GL_LINE_LOOP                    = 0x0002;
var GL_LINE_STRIP                   = 0x0003;
var GL_TRIANGLES                    = 0x0004;
var GL_TRIANGLE_STRIP               = 0x0005;
var GL_TRIANGLE_FAN                 = 0x0006; ///* AlphaFunction (not supported in ES20) */
///*      GL_NEVER */
///*      GL_LESS */
///*      GL_EQUAL */
///*      GL_LEQUAL */
///*      GL_GREATER */
///*      GL_NOTEQUAL */
///*      GL_GEQUAL */
///*      GL_ALWAYS */

///* BlendingFactorDest */
var GL_ZERO                          = 0;
var GL_ONE                           = 1;
var GL_SRC_COLOR                     = 0x0300;
var GL_ONE_MINUS_SRC_COLOR           = 0x0301;
var GL_SRC_ALPHA                     = 0x0302;
var GL_ONE_MINUS_SRC_ALPHA           = 0x0303;
var GL_DST_ALPHA                     = 0x0304;
var GL_ONE_MINUS_DST_ALPHA           = 0x0305; ///* BlendingFactorSrc */
///*      GL_ZERO */
///*      GL_ONE */
var GL_DST_COLOR                    = 0x0306;
var GL_ONE_MINUS_DST_COLOR          = 0x0307;
var GL_SRC_ALPHA_SATURATE           = 0x0308; ///*      GL_SRC_ALPHA */
///*      GL_ONE_MINUS_SRC_ALPHA */
///*      GL_DST_ALPHA */
///*      GL_ONE_MINUS_DST_ALPHA */

///* BlendEquationSeparate */
var GL_FUNC_ADD                     = 0x8006;
var GL_BLEND_EQUATION               = 0x8009;
var GL_BLEND_EQUATION_RGB           = 0x8009; /* same as BLEND_EQUATION */
var GL_BLEND_EQUATION_ALPHA         = 0x883D; ///* BlendSubtract */
var GL_FUNC_SUBTRACT                = 0x800A;
var GL_FUNC_REVERSE_SUBTRACT        = 0x800B; ///* Separate Blend Functions */
var GL_BLEND_DST_RGB                = 0x80C8;
var GL_BLEND_SRC_RGB                = 0x80C9;
var GL_BLEND_DST_ALPHA              = 0x80CA;
var GL_BLEND_SRC_ALPHA              = 0x80CB;
var GL_CONSTANT_COLOR               = 0x8001;
var GL_ONE_MINUS_CONSTANT_COLOR     = 0x8002;
var GL_CONSTANT_ALPHA               = 0x8003;
var GL_ONE_MINUS_CONSTANT_ALPHA     = 0x8004;
var GL_BLEND_COLOR                  = 0x8005; ///* Buffer Objects */
var GL_ARRAY_BUFFER                 = 0x8892;
var GL_ELEMENT_ARRAY_BUFFER         = 0x8893;
var GL_ARRAY_BUFFER_BINDING         = 0x8894;
var GL_ELEMENT_ARRAY_BUFFER_BINDING = 0x8895;
var GL_STREAM_DRAW                  = 0x88E0;
var GL_STATIC_DRAW                  = 0x88E4;
var GL_DYNAMIC_DRAW                 = 0x88E8;
var GL_BUFFER_SIZE                  = 0x8764;
var GL_BUFFER_USAGE                 = 0x8765;
var GL_CURRENT_VERTEX_ATTRIB        = 0x8626; ///* CullFaceMode */
var GL_FRONT                        = 0x0404;
var GL_BACK                         = 0x0405;
var GL_FRONT_AND_BACK               = 0x0408; ///* DepthFunction */
///*      GL_NEVER */
///*      GL_LESS */
///*      GL_EQUAL */
///*      GL_LEQUAL */
///*      GL_GREATER */
///*      GL_NOTEQUAL */
///*      GL_GEQUAL */
///*      GL_ALWAYS */

///* EnableCap */
var GL_TEXTURE_2D                   = 0x0DE1;
var GL_CULL_FACE                    = 0x0B44;
var GL_BLEND                        = 0x0BE2;
var GL_DITHER                       = 0x0BD0;
var GL_STENCIL_TEST                 = 0x0B90;
var GL_DEPTH_TEST                   = 0x0B71;
var GL_SCISSOR_TEST                 = 0x0C11;
var GL_POLYGON_OFFSET_FILL          = 0x8037;
var GL_SAMPLE_ALPHA_TO_COVERAGE     = 0x809E;
var GL_SAMPLE_COVERAGE              = 0x80A0; ///* ErrorCode */
var GL_NO_ERROR                     = 0;
var GL_INVALID_ENUM                 = 0x0500;
var GL_INVALID_VALUE                = 0x0501;
var GL_INVALID_OPERATION            = 0x0502;
var GL_OUT_OF_MEMORY                = 0x0505; ///* FrontFaceDirection */
var GL_CW                           = 0x0900;
var GL_CCW                          = 0x0901; ///* GetPName */
var GL_LINE_WIDTH                   = 0x0B21;
var GL_ALIASED_POINT_SIZE_RANGE     = 0x846D;
var GL_ALIASED_LINE_WIDTH_RANGE     = 0x846E;
var GL_CULL_FACE_MODE               = 0x0B45;
var GL_FRONT_FACE                   = 0x0B46;
var GL_DEPTH_RANGE                  = 0x0B70;
var GL_DEPTH_WRITEMASK              = 0x0B72;
var GL_DEPTH_CLEAR_VALUE            = 0x0B73;
var GL_DEPTH_FUNC                   = 0x0B74;
var GL_STENCIL_CLEAR_VALUE          = 0x0B91;
var GL_STENCIL_FUNC                 = 0x0B92;
var GL_STENCIL_FAIL                 = 0x0B94;
var GL_STENCIL_PASS_DEPTH_FAIL      = 0x0B95;
var GL_STENCIL_PASS_DEPTH_PASS      = 0x0B96;
var GL_STENCIL_REF                  = 0x0B97;
var GL_STENCIL_VALUE_MASK           = 0x0B93;
var GL_STENCIL_WRITEMASK            = 0x0B98;
var GL_STENCIL_BACK_FUNC            = 0x8800;
var GL_STENCIL_BACK_FAIL            = 0x8801;
var GL_STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802;
var GL_STENCIL_BACK_PASS_DEPTH_PASS = 0x8803;
var GL_STENCIL_BACK_REF             = 0x8CA3;
var GL_STENCIL_BACK_VALUE_MASK      = 0x8CA4;
var GL_STENCIL_BACK_WRITEMASK       = 0x8CA5;
var GL_VIEWPORT                     = 0x0BA2;
var GL_SCISSOR_BOX                  = 0x0C10; ///*      GL_SCISSOR_TEST */
var GL_COLOR_CLEAR_VALUE            = 0x0C22;
var GL_COLOR_WRITEMASK              = 0x0C23;
var GL_UNPACK_ALIGNMENT             = 0x0CF5;
var GL_PACK_ALIGNMENT               = 0x0D05;
var GL_MAX_TEXTURE_SIZE             = 0x0D33;
var GL_MAX_VIEWPORT_DIMS            = 0x0D3A;
var GL_SUBPIXEL_BITS                = 0x0D50;
var GL_RED_BITS                     = 0x0D52;
var GL_GREEN_BITS                   = 0x0D53;
var GL_BLUE_BITS                    = 0x0D54;
var GL_ALPHA_BITS                   = 0x0D55;
var GL_DEPTH_BITS                   = 0x0D56;
var GL_STENCIL_BITS                 = 0x0D57;
var GL_POLYGON_OFFSET_UNITS         = 0x2A00; ///*      GL_POLYGON_OFFSET_FILL */
var GL_POLYGON_OFFSET_FACTOR        = 0x8038;
var GL_TEXTURE_BINDING_2D           = 0x8069;
var GL_SAMPLE_BUFFERS               = 0x80A8;
var GL_SAMPLES                      = 0x80A9;
var GL_SAMPLE_COVERAGE_VALUE        = 0x80AA;
var GL_SAMPLE_COVERAGE_INVERT       = 0x80AB; ///* GetTextureParameter */
///*      GL_TEXTURE_MAG_FILTER */
///*      GL_TEXTURE_MIN_FILTER */
///*      GL_TEXTURE_WRAP_S */
///*      GL_TEXTURE_WRAP_T */

var GL_NUM_COMPRESSED_TEXTURE_FORMATS=0x86A2;
var GL_COMPRESSED_TEXTURE_FORMATS    =0x86A3; ///* HintMode */
var GL_DONT_CARE                    = 0x1100;
var GL_FASTEST                      = 0x1101;
var GL_NICEST                       = 0x1102; ///* HintTarget */
var GL_GENERATE_MIPMAP_HINT          = 0x8192; ///* DataType */
var GL_BYTE                         = 0x1400;
var GL_UNSIGNED_BYTE                = 0x1401;
var GL_SHORT                        = 0x1402;
var GL_UNSIGNED_SHORT               = 0x1403;
var GL_INT                          = 0x1404;
var GL_UNSIGNED_INT                 = 0x1405;
var GL_FLOAT                        = 0x1406;
var GL_FIXED                        = 0x140C; ///* PixelFormat */
var GL_DEPTH_COMPONENT              = 0x1902;
var GL_ALPHA                        = 0x1906;
var GL_RGB                          = 0x1907;
var GL_RGBA                         = 0x1908;
var GL_LUMINANCE                    = 0x1909;
var GL_LUMINANCE_ALPHA              = 0x190A; ///* PixelType */
///*      GL_UNSIGNED_BYTE */
var GL_UNSIGNED_SHORT_4_4_4_4       = 0x8033;
var GL_UNSIGNED_SHORT_5_5_5_1       = 0x8034;
var GL_UNSIGNED_SHORT_5_6_5         = 0x8363; ///* Shaders */
var GL_FRAGMENT_SHADER                = 0x8B30;
var GL_VERTEX_SHADER                  = 0x8B31;
var GL_MAX_VERTEX_ATTRIBS             = 0x8869;
var GL_MAX_VERTEX_UNIFORM_VECTORS     = 0x8DFB;
var GL_MAX_VARYING_VECTORS            = 0x8DFC;
var GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS=0x8B4D;
var GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C;
var GL_MAX_TEXTURE_IMAGE_UNITS        = 0x8872;
var GL_MAX_FRAGMENT_UNIFORM_VECTORS   = 0x8DFD;
var GL_SHADER_TYPE                    = 0x8B4F;
var GL_DELETE_STATUS                  = 0x8B80;
var GL_LINK_STATUS                    = 0x8B82;
var GL_VALIDATE_STATUS                = 0x8B83;
var GL_ATTACHED_SHADERS               = 0x8B85;
var GL_ACTIVE_UNIFORMS                = 0x8B86;
var GL_ACTIVE_UNIFORM_MAX_LENGTH      = 0x8B87;
var GL_ACTIVE_ATTRIBUTES              = 0x8B89;
var GL_ACTIVE_ATTRIBUTE_MAX_LENGTH    = 0x8B8A;
var GL_SHADING_LANGUAGE_VERSION       = 0x8B8C;
var GL_CURRENT_PROGRAM                = 0x8B8D; ///* StencilFunction */
var GL_NEVER                        = 0x0200;
var GL_LESS                         = 0x0201;
var GL_EQUAL                        = 0x0202;
var GL_LEQUAL                       = 0x0203;
var GL_GREATER                      = 0x0204;
var GL_NOTEQUAL                     = 0x0205;
var GL_GEQUAL                       = 0x0206;
var GL_ALWAYS                       = 0x0207; ///* StencilOp */
///*      GL_ZERO */
var GL_KEEP                         = 0x1E00;
var GL_REPLACE                      = 0x1E01;
var GL_INCR                         = 0x1E02;
var GL_DECR                         = 0x1E03;
var GL_INVERT                       = 0x150A;
var GL_INCR_WRAP                    = 0x8507;
var GL_DECR_WRAP                    = 0x8508; ///* StringName */
var GL_VENDOR                       = 0x1F00;
var GL_RENDERER                     = 0x1F01;
var GL_VERSION                      = 0x1F02;
var GL_EXTENSIONS                   = 0x1F03; ///* TextureMagFilter */
var GL_NEAREST                      = 0x2600;
var GL_LINEAR                       = 0x2601; ///* TextureMinFilter */
///*      GL_NEAREST */
///*      GL_LINEAR */
var GL_NEAREST_MIPMAP_NEAREST       = 0x2700;
var GL_LINEAR_MIPMAP_NEAREST        = 0x2701;
var GL_NEAREST_MIPMAP_LINEAR        = 0x2702;
var GL_LINEAR_MIPMAP_LINEAR         = 0x2703; ///* TextureParameterName */
var GL_TEXTURE_MAG_FILTER           = 0x2800;
var GL_TEXTURE_MIN_FILTER           = 0x2801;
var GL_TEXTURE_WRAP_S               = 0x2802;
var GL_TEXTURE_WRAP_T               = 0x2803; ///* TextureTarget */
///*      GL_TEXTURE_2D */
var GL_TEXTURE                      = 0x1702;
var GL_TEXTURE_CUBE_MAP             = 0x8513;
var GL_TEXTURE_BINDING_CUBE_MAP     = 0x8514;
var GL_TEXTURE_CUBE_MAP_POSITIVE_X  = 0x8515;
var GL_TEXTURE_CUBE_MAP_NEGATIVE_X  = 0x8516;
var GL_TEXTURE_CUBE_MAP_POSITIVE_Y  = 0x8517;
var GL_TEXTURE_CUBE_MAP_NEGATIVE_Y  = 0x8518;
var GL_TEXTURE_CUBE_MAP_POSITIVE_Z  = 0x8519;
var GL_TEXTURE_CUBE_MAP_NEGATIVE_Z  = 0x851A;
var GL_MAX_CUBE_MAP_TEXTURE_SIZE    = 0x851C; ///* TextureUnit */
var GL_TEXTURE0                     = 0x84C0;
var GL_TEXTURE1                     = 0x84C1;
var GL_TEXTURE2                     = 0x84C2;
var GL_TEXTURE3                     = 0x84C3;
var GL_TEXTURE4                     = 0x84C4;
var GL_TEXTURE5                     = 0x84C5;
var GL_TEXTURE6                     = 0x84C6;
var GL_TEXTURE7                     = 0x84C7;
var GL_TEXTURE8                     = 0x84C8;
var GL_TEXTURE9                     = 0x84C9;
var GL_TEXTURE10                    = 0x84CA;
var GL_TEXTURE11                    = 0x84CB;
var GL_TEXTURE12                    = 0x84CC;
var GL_TEXTURE13                    = 0x84CD;
var GL_TEXTURE14                    = 0x84CE;
var GL_TEXTURE15                    = 0x84CF;
var GL_TEXTURE16                    = 0x84D0;
var GL_TEXTURE17                    = 0x84D1;
var GL_TEXTURE18                    = 0x84D2;
var GL_TEXTURE19                    = 0x84D3;
var GL_TEXTURE20                    = 0x84D4;
var GL_TEXTURE21                    = 0x84D5;
var GL_TEXTURE22                    = 0x84D6;
var GL_TEXTURE23                    = 0x84D7;
var GL_TEXTURE24                    = 0x84D8;
var GL_TEXTURE25                    = 0x84D9;
var GL_TEXTURE26                    = 0x84DA;
var GL_TEXTURE27                    = 0x84DB;
var GL_TEXTURE28                    = 0x84DC;
var GL_TEXTURE29                    = 0x84DD;
var GL_TEXTURE30                    = 0x84DE;
var GL_TEXTURE31                    = 0x84DF;
var GL_ACTIVE_TEXTURE               = 0x84E0; ///* TextureWrapMode */
var GL_REPEAT                       = 0x2901;
var GL_CLAMP_TO_EDGE                = 0x812F;
var GL_MIRRORED_REPEAT              = 0x8370; ///* Uniform Types */
var GL_FLOAT_VEC2                   = 0x8B50;
var GL_FLOAT_VEC3                   = 0x8B51;
var GL_FLOAT_VEC4                   = 0x8B52;
var GL_INT_VEC2                     = 0x8B53;
var GL_INT_VEC3                     = 0x8B54;
var GL_INT_VEC4                     = 0x8B55;
var GL_BOOL                         = 0x8B56;
var GL_BOOL_VEC2                    = 0x8B57;
var GL_BOOL_VEC3                    = 0x8B58;
var GL_BOOL_VEC4                    = 0x8B59;
var GL_FLOAT_MAT2                   = 0x8B5A;
var GL_FLOAT_MAT3                   = 0x8B5B;
var GL_FLOAT_MAT4                   = 0x8B5C;
var GL_SAMPLER_2D                   = 0x8B5E;
var GL_SAMPLER_CUBE                 = 0x8B60; ///* Vertex Arrays */
var GL_VERTEX_ATTRIB_ARRAY_ENABLED      = 0x8622;
var GL_VERTEX_ATTRIB_ARRAY_SIZE         = 0x8623;
var GL_VERTEX_ATTRIB_ARRAY_STRIDE       = 0x8624;
var GL_VERTEX_ATTRIB_ARRAY_TYPE         = 0x8625;
var GL_VERTEX_ATTRIB_ARRAY_NORMALIZED   = 0x886A;
var GL_VERTEX_ATTRIB_ARRAY_POINTER      = 0x8645;
var GL_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING=0x889F; ///* Read Format */
var GL_IMPLEMENTATION_COLOR_READ_TYPE  =0x8B9A;
var GL_IMPLEMENTATION_COLOR_READ_FORMAT=0x8B9B; ///* Shader Source */
var GL_COMPILE_STATUS               = 0x8B81;
var GL_INFO_LOG_LENGTH              = 0x8B84;
var GL_SHADER_SOURCE_LENGTH         = 0x8B88;
var GL_SHADER_COMPILER              = 0x8DFA; ///* Shader Binary */
var GL_SHADER_BINARY_FORMATS        = 0x8DF8;
var GL_NUM_SHADER_BINARY_FORMATS    = 0x8DF9; ///* Shader Precision-Specified Types */
var GL_LOW_FLOAT                    = 0x8DF0;
var GL_MEDIUM_FLOAT                 = 0x8DF1;
var GL_HIGH_FLOAT                   = 0x8DF2;
var GL_LOW_INT                      = 0x8DF3;
var GL_MEDIUM_INT                   = 0x8DF4;
var GL_HIGH_INT                     = 0x8DF5; ///* Framebuffer Object. */
var GL_FRAMEBUFFER                  = 0x8D40;
var GL_RENDERBUFFER                 = 0x8D41;
var GL_RGBA4                        = 0x8056;
var GL_RGB5_A1                      = 0x8057;
var GL_RGB565                       = 0x8D62;
var GL_DEPTH_COMPONENT16            = 0x81A5;
var GL_STENCIL_INDEX                = 0x1901;
var GL_STENCIL_INDEX8               = 0x8D48;
var GL_RENDERBUFFER_WIDTH           = 0x8D42;
var GL_RENDERBUFFER_HEIGHT          = 0x8D43;
var GL_RENDERBUFFER_INTERNAL_FORMAT = 0x8D44;
var GL_RENDERBUFFER_RED_SIZE        = 0x8D50;
var GL_RENDERBUFFER_GREEN_SIZE      = 0x8D51;
var GL_RENDERBUFFER_BLUE_SIZE       = 0x8D52;
var GL_RENDERBUFFER_ALPHA_SIZE      = 0x8D53;
var GL_RENDERBUFFER_DEPTH_SIZE      = 0x8D54;
var GL_RENDERBUFFER_STENCIL_SIZE    = 0x8D55;
var GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE         = 0x8CD0;
var GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME         = 0x8CD1;
var GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL       = 0x8CD2;
var GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE=0x8CD3;
var GL_COLOR_ATTACHMENT0            = 0x8CE0;
var GL_DEPTH_ATTACHMENT             = 0x8D00;
var GL_STENCIL_ATTACHMENT           = 0x8D20;
var GL_NONE                         = 0;
var GL_FRAMEBUFFER_COMPLETE                    = 0x8CD5;
var GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT       = 0x8CD6;
var GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT=0x8CD7;
var GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS       = 0x8CD9;
var GL_FRAMEBUFFER_UNSUPPORTED                 = 0x8CDD;
var GL_FRAMEBUFFER_BINDING          = 0x8CA6;
var GL_RENDERBUFFER_BINDING         = 0x8CA7;
var GL_MAX_RENDERBUFFER_SIZE        = 0x84E8;
var GL_INVALID_FRAMEBUFFER_OPERATION =0x0506; ///*-------------------------------------------------------------------------
// * GL core functions.
// *-----------------------------------------------------------------------*/

//GL_APICALL void         GL_APIENTRY glActiveTexture (GLenum texture);
//GL_APICALL void         GL_APIENTRY glAttachShader (GLuint program, GLuint shader);
//GL_APICALL void         GL_APIENTRY glBindAttribLocation (GLuint program, GLuint index, const GLchar* name);
//GL_APICALL void         GL_APIENTRY glBindBuffer (GLenum target, GLuint buffer);
//GL_APICALL void         GL_APIENTRY glBindFramebuffer (GLenum target, GLuint framebuffer);
//GL_APICALL void         GL_APIENTRY glBindRenderbuffer (GLenum target, GLuint renderbuffer);
//GL_APICALL void         GL_APIENTRY glBindTexture (GLenum target, GLuint texture);
//GL_APICALL void         GL_APIENTRY glBlendColor (GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha);
//GL_APICALL void         GL_APIENTRY glBlendEquation ( GLenum mode );
//GL_APICALL void         GL_APIENTRY glBlendEquationSeparate (GLenum modeRGB, GLenum modeAlpha);
//GL_APICALL void         GL_APIENTRY glBlendFunc (GLenum sfactor, GLenum dfactor);
//GL_APICALL void         GL_APIENTRY glBlendFuncSeparate (GLenum srcRGB, GLenum dstRGB, GLenum srcAlpha, GLenum dstAlpha);
//GL_APICALL void         GL_APIENTRY glBufferData (GLenum target, GLsizeiptr size, const GLvoid* data, GLenum usage);
//GL_APICALL void         GL_APIENTRY glBufferSubData (GLenum target, GLintptr offset, GLsizeiptr size, const GLvoid* data);
//GL_APICALL GLenum       GL_APIENTRY glCheckFramebufferStatus (GLenum target);
//GL_APICALL void         GL_APIENTRY glClear (GLbitfield mask);
//GL_APICALL void         GL_APIENTRY glClearColor (GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha);
//GL_APICALL void         GL_APIENTRY glClearDepthf (GLclampf depth);
//GL_APICALL void         GL_APIENTRY glClearStencil (GLint s);
//GL_APICALL void         GL_APIENTRY glColorMask (GLboolean red, GLboolean green, GLboolean blue, GLboolean alpha);
//GL_APICALL void         GL_APIENTRY glCompileShader (GLuint shader);
//GL_APICALL void         GL_APIENTRY glCompressedTexImage2D (GLenum target, GLint level, GLenum internalformat, GLsizei width, GLsizei height, GLint border, GLsizei imageSize, const GLvoid* data);
//GL_APICALL void         GL_APIENTRY glCompressedTexSubImage2D (GLenum target, GLint level, GLint xoffset, GLint yoffset, GLsizei width, GLsizei height, GLenum format, GLsizei imageSize, const GLvoid* data);
//GL_APICALL void         GL_APIENTRY glCopyTexImage2D (GLenum target, GLint level, GLenum internalformat, GLint x, GLint y, GLsizei width, GLsizei height, GLint border);
//GL_APICALL void         GL_APIENTRY glCopyTexSubImage2D (GLenum target, GLint level, GLint xoffset, GLint yoffset, GLint x, GLint y, GLsizei width, GLsizei height);
//GL_APICALL GLuint       GL_APIENTRY glCreateProgram (void);
//GL_APICALL GLuint       GL_APIENTRY glCreateShader (GLenum type);
//GL_APICALL void         GL_APIENTRY glCullFace (GLenum mode);
//GL_APICALL void         GL_APIENTRY glDeleteBuffers (GLsizei n, const GLuint* buffers);
//GL_APICALL void         GL_APIENTRY glDeleteFramebuffers (GLsizei n, const GLuint* framebuffers);
//GL_APICALL void         GL_APIENTRY glDeleteProgram (GLuint program);
//GL_APICALL void         GL_APIENTRY glDeleteRenderbuffers (GLsizei n, const GLuint* renderbuffers);
//GL_APICALL void         GL_APIENTRY glDeleteShader (GLuint shader);
//GL_APICALL void         GL_APIENTRY glDeleteTextures (GLsizei n, const GLuint* textures);
//GL_APICALL void         GL_APIENTRY glDepthFunc (GLenum func);
//GL_APICALL void         GL_APIENTRY glDepthMask (GLboolean flag);
//GL_APICALL void         GL_APIENTRY glDepthRangef (GLclampf zNear, GLclampf zFar);
//GL_APICALL void         GL_APIENTRY glDetachShader (GLuint program, GLuint shader);
//GL_APICALL void         GL_APIENTRY glDisable (GLenum cap);
//GL_APICALL void         GL_APIENTRY glDisableVertexAttribArray (GLuint index);
//GL_APICALL void         GL_APIENTRY glDrawArrays (GLenum mode, GLint first, GLsizei count);
//GL_APICALL void         GL_APIENTRY glDrawElements (GLenum mode, GLsizei count, GLenum type, const GLvoid* indices);
//GL_APICALL void         GL_APIENTRY glEnable (GLenum cap);
//GL_APICALL void         GL_APIENTRY glEnableVertexAttribArray (GLuint index);
//GL_APICALL void         GL_APIENTRY glFinish (void);
//GL_APICALL void         GL_APIENTRY glFlush (void);
//GL_APICALL void         GL_APIENTRY glFramebufferRenderbuffer (GLenum target, GLenum attachment, GLenum renderbuffertarget, GLuint renderbuffer);
//GL_APICALL void         GL_APIENTRY glFramebufferTexture2D (GLenum target, GLenum attachment, GLenum textarget, GLuint texture, GLint level);
//GL_APICALL void         GL_APIENTRY glFrontFace (GLenum mode);
//GL_APICALL void         GL_APIENTRY glGenBuffers (GLsizei n, GLuint* buffers);
//GL_APICALL void         GL_APIENTRY glGenerateMipmap (GLenum target);
//GL_APICALL void         GL_APIENTRY glGenFramebuffers (GLsizei n, GLuint* framebuffers);
//GL_APICALL void         GL_APIENTRY glGenRenderbuffers (GLsizei n, GLuint* renderbuffers);
//GL_APICALL void         GL_APIENTRY glGenTextures (GLsizei n, GLuint* textures);
//GL_APICALL void         GL_APIENTRY glGetActiveAttrib (GLuint program, GLuint index, GLsizei bufsize, GLsizei* length, GLint* size, GLenum* type, GLchar* name);
//GL_APICALL void         GL_APIENTRY glGetActiveUniform (GLuint program, GLuint index, GLsizei bufsize, GLsizei* length, GLint* size, GLenum* type, GLchar* name);
//GL_APICALL void         GL_APIENTRY glGetAttachedShaders (GLuint program, GLsizei maxcount, GLsizei* count, GLuint* shaders);
//GL_APICALL int          GL_APIENTRY glGetAttribLocation (GLuint program, const GLchar* name);
//GL_APICALL void         GL_APIENTRY glGetBooleanv (GLenum pname, GLboolean* params);
//GL_APICALL void         GL_APIENTRY glGetBufferParameteriv (GLenum target, GLenum pname, GLint* params);
//GL_APICALL GLenum       GL_APIENTRY glGetError (void);
//GL_APICALL void         GL_APIENTRY glGetFloatv (GLenum pname, GLfloat* params);
//GL_APICALL void         GL_APIENTRY glGetFramebufferAttachmentParameteriv (GLenum target, GLenum attachment, GLenum pname, GLint* params);
//GL_APICALL void         GL_APIENTRY glGetIntegerv (GLenum pname, GLint* params);
//GL_APICALL void         GL_APIENTRY glGetProgramiv (GLuint program, GLenum pname, GLint* params);
//GL_APICALL void         GL_APIENTRY glGetProgramInfoLog (GLuint program, GLsizei bufsize, GLsizei* length, GLchar* infolog);
//GL_APICALL void         GL_APIENTRY glGetRenderbufferParameteriv (GLenum target, GLenum pname, GLint* params);
//GL_APICALL void         GL_APIENTRY glGetShaderiv (GLuint shader, GLenum pname, GLint* params);
//GL_APICALL void         GL_APIENTRY glGetShaderInfoLog (GLuint shader, GLsizei bufsize, GLsizei* length, GLchar* infolog);
//GL_APICALL void         GL_APIENTRY glGetShaderPrecisionFormat (GLenum shadertype, GLenum precisiontype, GLint* range, GLint* precision);
//GL_APICALL void         GL_APIENTRY glGetShaderSource (GLuint shader, GLsizei bufsize, GLsizei* length, GLchar* source);
//GL_APICALL const GLubyte* GL_APIENTRY glGetString (GLenum name);
//GL_APICALL void         GL_APIENTRY glGetTexParameterfv (GLenum target, GLenum pname, GLfloat* params);
//GL_APICALL void         GL_APIENTRY glGetTexParameteriv (GLenum target, GLenum pname, GLint* params);
//GL_APICALL void         GL_APIENTRY glGetUniformfv (GLuint program, GLint location, GLfloat* params);
//GL_APICALL void         GL_APIENTRY glGetUniformiv (GLuint program, GLint location, GLint* params);
//GL_APICALL int          GL_APIENTRY glGetUniformLocation (GLuint program, const GLchar* name);
//GL_APICALL void         GL_APIENTRY glGetVertexAttribfv (GLuint index, GLenum pname, GLfloat* params);
//GL_APICALL void         GL_APIENTRY glGetVertexAttribiv (GLuint index, GLenum pname, GLint* params);
//GL_APICALL void         GL_APIENTRY glGetVertexAttribPointerv (GLuint index, GLenum pname, GLvoid** pointer);
//GL_APICALL void         GL_APIENTRY glHint (GLenum target, GLenum mode);
//GL_APICALL GLboolean    GL_APIENTRY glIsBuffer (GLuint buffer);
//GL_APICALL GLboolean    GL_APIENTRY glIsEnabled (GLenum cap);
//GL_APICALL GLboolean    GL_APIENTRY glIsFramebuffer (GLuint framebuffer);
//GL_APICALL GLboolean    GL_APIENTRY glIsProgram (GLuint program);
//GL_APICALL GLboolean    GL_APIENTRY glIsRenderbuffer (GLuint renderbuffer);
//GL_APICALL GLboolean    GL_APIENTRY glIsShader (GLuint shader);
//GL_APICALL GLboolean    GL_APIENTRY glIsTexture (GLuint texture);
//GL_APICALL void         GL_APIENTRY glLineWidth (GLfloat width);
//GL_APICALL void         GL_APIENTRY glLinkProgram (GLuint program);
//GL_APICALL void         GL_APIENTRY glPixelStorei (GLenum pname, GLint param);
//GL_APICALL void         GL_APIENTRY glPolygonOffset (GLfloat factor, GLfloat units);
//GL_APICALL void         GL_APIENTRY glReadPixels (GLint x, GLint y, GLsizei width, GLsizei height, GLenum format, GLenum type, GLvoid* pixels);
//GL_APICALL void         GL_APIENTRY glReleaseShaderCompiler (void);
//GL_APICALL void         GL_APIENTRY glRenderbufferStorage (GLenum target, GLenum internalformat, GLsizei width, GLsizei height);
//GL_APICALL void         GL_APIENTRY glSampleCoverage (GLclampf value, GLboolean invert);
//GL_APICALL void         GL_APIENTRY glScissor (GLint x, GLint y, GLsizei width, GLsizei height);
//GL_APICALL void         GL_APIENTRY glShaderBinary (GLsizei n, const GLuint* shaders, GLenum binaryformat, const GLvoid* binary, GLsizei length);
//GL_APICALL void         GL_APIENTRY glShaderSource (GLuint shader, GLsizei count, const GLchar** string, const GLint* length);
//GL_APICALL void         GL_APIENTRY glStencilFunc (GLenum func, GLint ref, GLuint mask);
//GL_APICALL void         GL_APIENTRY glStencilFuncSeparate (GLenum face, GLenum func, GLint ref, GLuint mask);
//GL_APICALL void         GL_APIENTRY glStencilMask (GLuint mask);
//GL_APICALL void         GL_APIENTRY glStencilMaskSeparate (GLenum face, GLuint mask);
//GL_APICALL void         GL_APIENTRY glStencilOp (GLenum fail, GLenum zfail, GLenum zpass);
//GL_APICALL void         GL_APIENTRY glStencilOpSeparate (GLenum face, GLenum fail, GLenum zfail, GLenum zpass);
//GL_APICALL void         GL_APIENTRY glTexImage2D (GLenum target, GLint level, GLint internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, const GLvoid* pixels);
//GL_APICALL void         GL_APIENTRY glTexParameterf (GLenum target, GLenum pname, GLfloat param);
//GL_APICALL void         GL_APIENTRY glTexParameterfv (GLenum target, GLenum pname, const GLfloat* params);
//GL_APICALL void         GL_APIENTRY glTexParameteri (GLenum target, GLenum pname, GLint param);
//GL_APICALL void         GL_APIENTRY glTexParameteriv (GLenum target, GLenum pname, const GLint* params);
//GL_APICALL void         GL_APIENTRY glTexSubImage2D (GLenum target, GLint level, GLint xoffset, GLint yoffset, GLsizei width, GLsizei height, GLenum format, GLenum type, const GLvoid* pixels);
//GL_APICALL void         GL_APIENTRY glUniform1f (GLint location, GLfloat x);
//GL_APICALL void         GL_APIENTRY glUniform1fv (GLint location, GLsizei count, const GLfloat* v);
//GL_APICALL void         GL_APIENTRY glUniform1i (GLint location, GLint x);
//GL_APICALL void         GL_APIENTRY glUniform1iv (GLint location, GLsizei count, const GLint* v);
//GL_APICALL void         GL_APIENTRY glUniform2f (GLint location, GLfloat x, GLfloat y);
//GL_APICALL void         GL_APIENTRY glUniform2fv (GLint location, GLsizei count, const GLfloat* v);
//GL_APICALL void         GL_APIENTRY glUniform2i (GLint location, GLint x, GLint y);
//GL_APICALL void         GL_APIENTRY glUniform2iv (GLint location, GLsizei count, const GLint* v);
//GL_APICALL void         GL_APIENTRY glUniform3f (GLint location, GLfloat x, GLfloat y, GLfloat z);
//GL_APICALL void         GL_APIENTRY glUniform3fv (GLint location, GLsizei count, const GLfloat* v);
//GL_APICALL void         GL_APIENTRY glUniform3i (GLint location, GLint x, GLint y, GLint z);
//GL_APICALL void         GL_APIENTRY glUniform3iv (GLint location, GLsizei count, const GLint* v);
//GL_APICALL void         GL_APIENTRY glUniform4f (GLint location, GLfloat x, GLfloat y, GLfloat z, GLfloat w);
//GL_APICALL void         GL_APIENTRY glUniform4fv (GLint location, GLsizei count, const GLfloat* v);
//GL_APICALL void         GL_APIENTRY glUniform4i (GLint location, GLint x, GLint y, GLint z, GLint w);
//GL_APICALL void         GL_APIENTRY glUniform4iv (GLint location, GLsizei count, const GLint* v);
//GL_APICALL void         GL_APIENTRY glUniformMatrix2fv (GLint location, GLsizei count, GLboolean transpose, const GLfloat* value);
//GL_APICALL void         GL_APIENTRY glUniformMatrix3fv (GLint location, GLsizei count, GLboolean transpose, const GLfloat* value);
//GL_APICALL void         GL_APIENTRY glUniformMatrix4fv (GLint location, GLsizei count, GLboolean transpose, const GLfloat* value);
//GL_APICALL void         GL_APIENTRY glUseProgram (GLuint program);
//GL_APICALL void         GL_APIENTRY glValidateProgram (GLuint program);
//GL_APICALL void         GL_APIENTRY glVertexAttrib1f (GLuint indx, GLfloat x);
//GL_APICALL void         GL_APIENTRY glVertexAttrib1fv (GLuint indx, const GLfloat* values);
//GL_APICALL void         GL_APIENTRY glVertexAttrib2f (GLuint indx, GLfloat x, GLfloat y);
//GL_APICALL void         GL_APIENTRY glVertexAttrib2fv (GLuint indx, const GLfloat* values);
//GL_APICALL void         GL_APIENTRY glVertexAttrib3f (GLuint indx, GLfloat x, GLfloat y, GLfloat z);
//GL_APICALL void         GL_APIENTRY glVertexAttrib3fv (GLuint indx, const GLfloat* values);
//GL_APICALL void         GL_APIENTRY glVertexAttrib4f (GLuint indx, GLfloat x, GLfloat y, GLfloat z, GLfloat w);
//GL_APICALL void         GL_APIENTRY glVertexAttrib4fv (GLuint indx, const GLfloat* values);
//GL_APICALL void         GL_APIENTRY glVertexAttribPointer (GLuint indx, GLint size, GLenum type, GLboolean normalized, GLsizei stride, const GLvoid* ptr);
//GL_APICALL void         GL_APIENTRY glViewport (GLint x, GLint y, GLsizei width, GLsizei height);

//#ifdef __cplusplus
//}
//#endif

//#endif /* __gl2_h_ */
