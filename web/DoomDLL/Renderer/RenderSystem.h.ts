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

////#ifndef __RENDERER_H__
////#define __RENDERER_H__

/////*
////===============================================================================

////	idRenderSystem is responsible for managing the screen, which can have
////	multiple idRenderWorld and 2D drawing done on it.

////===============================================================================
////*/


// Contains variables specific to the OpenGL configuration being run right now.
// These are constant once the OpenGL subsystem is initialized.
class /*glconfig_s*/glconfig_t {
/*	const char			**/renderer_string:string;
/*	const char			**/vendor_string:string;
/*	const char			**/version_string:string;
/*	const char			**/extensions_string:string;
/*	const char			**/wgl_extensions_string:string;

/*	float				*/glVersion:number;				// atof( version_string )


/*	int					*/maxTextureSize:number;			// queried from GL
/*	int					*/maxTextureUnits:number;
/*	int					*/maxTextureCoords:number;
/*	int					*/maxTextureImageUnits:number;
/*	float				*/maxTextureAnisotropy:number;

/*	int					*/colorBits:number; depthBits:number; stencilBits:number;

/*	bool				*/multitextureAvailable:boolean;
/*	bool				*/textureCompressionAvailable:boolean;
/*	bool				*/anisotropicAvailable:boolean;
/*	bool				*/textureLODBiasAvailable:boolean;
/*	bool				*/textureEnvAddAvailable:boolean;
/*	bool				*/textureEnvCombineAvailable:boolean;
/*	bool				*/cubeMapAvailable:boolean;
/*	bool				*/envDot3Available:boolean;
/*	bool				*/texture3DAvailable:boolean;
/*	bool				*/sharedTexturePaletteAvailable:boolean;
/*	bool				*/ARBVertexBufferObjectAvailable:boolean;
/*	bool				*/ARBVertexProgramAvailable:boolean;
/*	bool				*/ARBFragmentProgramAvailable:boolean;
/*	bool				*/textureNonPowerOfTwoAvailable:boolean;
/*	bool				*/depthBoundsTestAvailable:boolean;
/*	bool				*/GLSLAvailable:boolean;
/*	int					*/vidWidth:number; vidHeight:number;	// passed to R_BeginFrame

/*	int					*/displayFrequency:number;

/*	bool				*/isFullscreen:boolean;

/*	bool				*/allowARB2Path:boolean;
/*	bool				*/allowGLSLPath:boolean;

/*	bool				*/isInitialized:boolean;
};


// font support 
var GLYPH_START			= 0;
var GLYPH_END				= 255;
var GLYPH_CHARSTART		= 32;
var GLYPH_CHAREND			= 127;
var GLYPHS_PER_FONT		= GLYPH_END - GLYPH_START + 1;

class glyphInfo_t {
	height: number; // number of scan lines					//int					
	top: number; // top of glyph in buffer				//int					
	bottom: number; // bottom of glyph in buffer			//int					
	pitch: number; // width for copying					//int					
	xSkip: number; // x adjustment							//int					
	imageWidth: number; // width of actual image				//int					
	imageHeight: number; // height of actual image				//int					
	s: number; // x offset in image where glyph starts	//float				
	t: number; // y offset in image where glyph starts	//float				
	s2: number; //float				
	t2: number; //float				
	glyph: idMaterial; // shader with the glyph				//const idMaterial *	
	shaderName = new Uint8Array( 32 ); //char				

	init ( ): void {
		this.height = 0;
		this.top = 0;
		this.bottom = 0;
		this.pitch = 0;
		this.xSkip = 0;
		this.imageWidth = 0;
		this.imageHeight = 0;
		this.s = 0.0;
		this.t = 0.0;
		this.s2 = 0.0;
		this.t2 = 0.0;
		this.glyph = null;
		memset( this.shaderName, 0, this.shaderName.length );
	}
}

class fontInfo_t {
	static size = 20548;

	glyphs = newStructArray<glyphInfo_t>( glyphInfo_t, GLYPHS_PER_FONT );
	glyphScale: number /*float*/;
	name = new Uint8Array(64); //char

	init(): void {
		clearStructArray(this.glyphs);
		this.glyphScale = 0.0;
		memset( this.name, 0, this.name.length );
	}

	equals ( other: fontInfo_t ): fontInfo_t {
		this.glyphs = other.glyphs; // note: copy by ref prolly okay
		this.glyphScale = other.glyphScale;
		memcpy( this.name, other.name, sizeof( this.name ) );

		return this;
	}
}

class fontInfoEx_t {
	fontInfoSmall = new fontInfo_t;
	fontInfoMedium = new fontInfo_t;
	fontInfoLarge = new fontInfo_t;
	maxHeight: number; //int					
	maxWidth: number; //int					
	maxHeightSmall: number; //int					
	maxWidthSmall: number; //int					
	maxHeightMedium: number; //int					
	maxWidthMedium: number; //int					
	maxHeightLarge: number; //int					
	maxWidthLarge: number; //int					
	name = new Uint8Array( 64 ); //char		

	init ( ): void {
		this.fontInfoSmall.init ( );
		this.fontInfoMedium.init ( );
		this.fontInfoLarge.init ( );
		this.maxHeight = 0;
		this.maxWidth = 0;
		this.maxHeightSmall = 0;
		this.maxWidthSmall = 0;
		this.maxHeightMedium = 0;
		this.maxWidthMedium = 0;
		this.maxHeightLarge = 0;
		this.maxWidthLarge = 0;
		this.name = new Uint8Array( 64 ); //char		
	}

	copy ( ): fontInfoEx_t {
		var other = new fontInfoEx_t;
		other.fontInfoSmall.equals( this.fontInfoSmall );
		other.fontInfoMedium.equals( this.fontInfoMedium );
		other.fontInfoLarge.equals( this.fontInfoLarge );
		other.maxHeight = this.maxHeight;
		other.maxWidth = this.maxWidth;
		other.maxHeightSmall = this.maxHeightSmall;
		other.maxWidthSmall = this.maxWidthSmall;
		other.maxHeightMedium = this.maxHeightMedium;
		other.maxWidthMedium = this.maxWidthMedium;
		other.maxHeightLarge = this.maxHeightLarge;
		other.maxWidthLarge = this.maxWidthLarge;
		memcpy( other.name, this.name, sizeof( this.name ) );

		return other;
	}
}

var SMALLCHAR_WIDTH		= 8;
var SMALLCHAR_HEIGHT	= 16;
var BIGCHAR_WIDTH		= 16;
var BIGCHAR_HEIGHT		= 16;

// all drawing is done to a 640 x 480 virtual screen size
// and will be automatically scaled to the real resolution
var SCREEN_WIDTH		= 640;
var SCREEN_HEIGHT		= 480;

////class idRenderWorld;


////class idRenderSystem {
////public:

////	virtual					~idRenderSystem() {}

////	// set up cvars and basic data structures, but don't
////	// init OpenGL, so it can also be used for dedicated servers
////	virtual void			Init( void ) = 0;

////	// only called before quitting
////	virtual void			Shutdown( void ) = 0;

////	virtual void			InitOpenGL( void ) = 0;

////	virtual void			ShutdownOpenGL( void ) = 0;

////	virtual bool			IsOpenGLRunning( void ) const = 0;

////	virtual bool			IsFullScreen( void ) const = 0;
////	virtual int				GetScreenWidth( void ) const = 0;
////	virtual int				GetScreenHeight( void ) const = 0;

////	// allocate a renderWorld to be used for drawing
////	virtual idRenderWorld *	AllocRenderWorld( void ) = 0;
////	virtual	void			FreeRenderWorld( idRenderWorld * rw ) = 0;

////	// All data that will be used in a level should be
////	// registered before rendering any frames to prevent disk hits,
////	// but they can still be registered at a later time
////	// if necessary.
////	virtual void			BeginLevelLoad( void ) = 0;
////	virtual void			EndLevelLoad( void ) = 0;

////	// font support
////	virtual bool			RegisterFont( const char *fontName, fontInfoEx_t &font ) = 0;

////	// GUI drawing just involves shader parameter setting and axial image subsections
////	virtual void			SetColor( const idVec4 &rgba ) = 0;
////	virtual void			SetColor4( float r, float g, float b, float a ) = 0;

////	virtual void			DrawStretchPic( const idDrawVert *verts, const glIndex_t *indexes, int vertCount, int indexCount, const idMaterial *material,
////											bool clip = true, float min_x = 0.0, float min_y = 0.0, float max_x = 640.0f, float max_y = 480.0f ) = 0;
////	virtual void			DrawStretchPic( float x, float y, float w, float h, float s1, float t1, float s2, float t2, const idMaterial *material ) = 0;

////	virtual void			DrawStretchTri ( idVec2 p1, idVec2 p2, idVec2 p3, idVec2 t1, idVec2 t2, idVec2 t3, const idMaterial *material ) = 0;
////	virtual void			GlobalToNormalizedDeviceCoordinates( const idVec3 &global, idVec3 &ndc ) = 0;
////	virtual void			GetGLSettings( int& width, int& height ) = 0;
////	virtual void			PrintMemInfo( MemInfo_t *mi ) = 0;

////	virtual void			DrawSmallChar( int x, int y, int ch, const idMaterial *material ) = 0;
////	virtual void			DrawSmallStringExt( int x, int y, const char *string, const idVec4 &setColor, bool forceColor, const idMaterial *material ) = 0;
////	virtual void			DrawBigChar( int x, int y, int ch, const idMaterial *material ) = 0;
////	virtual void			DrawBigStringExt( int x, int y, const char *string, const idVec4 &setColor, bool forceColor, const idMaterial *material ) = 0;

////	// dump all 2D drawing so far this frame to the demo file
////	virtual void			WriteDemoPics() = 0;

////	// draw the 2D pics that were saved out with the current demo frame
////	virtual void			DrawDemoPics() = 0;

////	// FIXME: add an interface for arbitrary point/texcoord drawing


////	// a frame cam consist of 2D drawing and potentially multiple 3D scenes
////	// window sizes are needed to convert SCREEN_WIDTH / SCREEN_HEIGHT values
////	virtual void			BeginFrame( int windowWidth, int windowHeight ) = 0;

////	// if the pointers are not NULL, timing info will be returned
////	virtual void			EndFrame( int *frontEndMsec, int *backEndMsec ) = 0;

////	// aviDemo uses this.
////	// Will automatically tile render large screen shots if necessary
////	// Samples is the number of jittered frames for anti-aliasing
////	// If ref == NULL, session.updateScreen will be used
////	// This will perform swapbuffers, so it is NOT an approppriate way to
////	// generate image files that happen during gameplay, as for savegame
////	// markers.  Use WriteRender() instead.
////	virtual void			TakeScreenshot( int width, int height, const char *fileName, int samples, struct renderView_s *ref ) = 0;

////	// the render output can be cropped down to a subset of the real screen, as
////	// for save-game reviews and split-screen multiplayer.  Users of the renderer
////	// will not know the actual pixel size of the area they are rendering to

////	// the x,y,width,height values are in virtual SCREEN_WIDTH / SCREEN_HEIGHT coordinates

////	// to render to a texture, first set the crop size with makePowerOfTwo = true,
////	// then perform all desired rendering, then capture to an image
////	// if the specified physical dimensions are larger than the current cropped region, they will be cut down to fit
////	virtual void			CropRenderSize( int width, int height, bool makePowerOfTwo = false, bool forceDimensions = false ) = 0;
////	virtual void			CaptureRenderToImage( const char *imageName ) = 0;
////	// fixAlpha will set all the alpha channel values to 0xff, which allows screen captures
////	// to use the default tga loading code without having dimmed down areas in many places
////	virtual void			CaptureRenderToFile( const char *fileName, bool fixAlpha = false ) = 0;
////	virtual void			UnCrop() = 0;

////	// the image has to be already loaded ( most straightforward way would be through a FindMaterial )
////	// texture filter / mipmapping / repeat won't be modified by the upload
////	// returns false if the image wasn't found
////	virtual bool			UploadImage( const char *imageName, const byte *data, int width, int height ) = 0;
////};

////extern idRenderSystem *			renderSystem;

//////
////// functions mainly intended for editor and dmap integration
//////

////// returns the frustum planes in world space
////void R_RenderLightFrustum( const struct renderLight_s &renderLight, idPlane lightFrustum[6] );

////// for use by dmap to do the carving-on-light-boundaries and for the editor for display
////void R_LightProjectionMatrix( const idVec3 &origin, const idPlane &rearPlane, idVec4 mat[4] );

////// used by the view shot taker
////void R_ScreenshotFilename( int &lastNumber, const char *base, idStr &fileName );

////#endif /* !__RENDERER_H__ */
