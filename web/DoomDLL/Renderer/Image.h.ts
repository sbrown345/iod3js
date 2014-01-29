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

/////*
////====================================================================

////IMAGE

////idImage have a one to one correspondance with OpenGL textures.

////No texture is ever used that does not have a corresponding idImage.

////no code outside this unit should call any of these OpenGL functions:

////glGenTextures
////glDeleteTextures
////glBindTexture

////glTexParameter

////glTexImage
////glTexSubImage

////glCopyTexImage
////glCopyTexSubImage

////glEnable( GL_TEXTURE_* )
////glDisable( GL_TEXTURE_* )

////====================================================================
////*/

////typedef enum {
////	IS_UNLOADED,	// no gl texture number
////	IS_PARTIAL,		// has a texture number and the low mip levels loaded
////	IS_LOADED		// has a texture number and the full mip hierarchy
////} imageState_t;

////static const int	MAX_TEXTURE_LEVELS = 14;

////// surface description flags
////const unsigned long DDSF_CAPS           = 0x00000001l;
////const unsigned long DDSF_HEIGHT         = 0x00000002l;
////const unsigned long DDSF_WIDTH          = 0x00000004l;
////const unsigned long DDSF_PITCH          = 0x00000008l;
////const unsigned long DDSF_PIXELFORMAT    = 0x00001000l;
////const unsigned long DDSF_MIPMAPCOUNT    = 0x00020000l;
////const unsigned long DDSF_LINEARSIZE     = 0x00080000l;
////const unsigned long DDSF_DEPTH          = 0x00800000l;

////// pixel format flags
////const unsigned long DDSF_ALPHAPIXELS    = 0x00000001l;
////const unsigned long DDSF_FOURCC         = 0x00000004l;
////const unsigned long DDSF_RGB            = 0x00000040l;
////const unsigned long DDSF_RGBA           = 0x00000041l;

////// our extended flags
////const unsigned long DDSF_ID_INDEXCOLOR	= 0x10000000l;

////// dwCaps1 flags
////const unsigned long DDSF_COMPLEX         = 0x00000008l;
////const unsigned long DDSF_TEXTURE         = 0x00001000l;
////const unsigned long DDSF_MIPMAP          = 0x00400000l;

////#define DDS_MAKEFOURCC(a, b, c, d) ((a) | ((b) << 8) | ((c) << 16) | ((d) << 24))

////typedef struct {
////    unsigned long dwSize;
////    unsigned long dwFlags;
////    unsigned long dwFourCC;
////    unsigned long dwRGBBitCount;
////    unsigned long dwRBitMask;
////    unsigned long dwGBitMask;
////    unsigned long dwBBitMask;
////    unsigned long dwABitMask;
////} ddsFilePixelFormat_t;

////typedef struct
////{
////    unsigned long dwSize;
////    unsigned long dwFlags;
////    unsigned long dwHeight;
////    unsigned long dwWidth;
////    unsigned long dwPitchOrLinearSize;
////    unsigned long dwDepth;
////    unsigned long dwMipMapCount;
////    unsigned long dwReserved1[11];
////    ddsFilePixelFormat_t ddspf;
////    unsigned long dwCaps1;
////    unsigned long dwCaps2;
////    unsigned long dwReserved2[3];
////} ddsFileHeader_t;


//// increasing numeric values imply more information is stored
enum textureDepth_t {
    TD_SPECULAR,			    // may be compressed, and always zeros the alpha channel
	TD_DIFFUSE,				    // may be compressed
	TD_DEFAULT,				    // will use compressed formats when possible
	TD_BUMP,				    // may be compressed with 8 bit lookup
	TD_HIGH_QUALITY 			// either 32 bit or a component format, no loss at all
}

enum textureType_t{
	TT_DISABLED,
	TT_2D,
	TT_3D,
	TT_CUBIC,
	TT_RECT
}

enum cubeFiles_t{
	CF_2D,			// not a cube map
	CF_NATIVE,		// _px, _nx, _py, etc, directly sent to GL
	CF_CAMERA		// _forward, _back, etc, rotated and flipped as needed before sending to GL
}

var MAX_IMAGE_NAME = 256;

var imageFilter:string[] = [
	"GL_LINEAR_MIPMAP_NEAREST",
	"GL_LINEAR_MIPMAP_LINEAR",
	"GL_NEAREST",
	"GL_LINEAR",
	"GL_NEAREST_MIPMAP_NEAREST",
	"GL_NEAREST_MIPMAP_LINEAR",
	null
];

class idImage {
//public:
//				idImage();

//	// Makes this image active on the current GL texture unit.
//	// automatically enables or disables cube mapping or texture3D
//	// May perform file loading if the image was not preloaded.
//	// May start a background image read.
//	void		Bind();

//	// for use with fragment programs, doesn't change any enable2D/3D/cube states
//	void		BindFragment();

//	// deletes the texture object, but leaves the structure so it can be reloaded
	PurgeImage():void { throw "placeholder"; }

//	// used by callback functions to specify the actual data
//	// data goes from the bottom to the top line of the image, as OpenGL expects it
//	// These perform an implicit Bind() on the current texture unit
//	// FIXME: should we implement cinematics this way, instead of with explicit calls?
    GenerateImage ( pic: Uint8Array, /*int */width: number, /*int */height: number,
        filterParm: textureFilter_t, /*bool */allowDownSizeParm: boolean,
		repeatParm: textureRepeat_t, depthParm: textureDepth_t): void { throw "placeholder";}
//#if !defined(GL_ES_VERSION_2_0)
//	void		Generate3DImage( const byte *pic, int width, int height, int depth,
//						textureFilter_t filter, bool allowDownSize, 
//						textureRepeat_t repeat, textureDepth_t minDepth );
//#endif
GenerateCubeImage( /*const byte *pic[6]*/pic:Uint8Array[], /*int*/ size: number,
	filterParm: textureFilter_t, allowDownSizeParm: boolean,
	depthParm: textureDepth_t):void { throw "placeholder"; }

//	void		CopyFramebuffer( int x, int y, int width, int height, bool useOversizedBuffer );

//	void		CopyDepthbuffer( int x, int y, int width, int height );

//	void		UploadScratch( const byte *pic, int width, int height );

//	// just for resource tracking
//	void		SetClassification( int tag );

//	// estimates size of the GL image based on dimensions and storage type
//	int			StorageSize() const;

//	// print a one line summary of the image
//	void		Print() const;

//	// check for changed timestamp on disk and reload if necessary
//	void		Reload( bool checkPrecompressed, bool force );

//	void		AddReference()				{ refCount++; };

////==========================================================

//	void		GetDownsize( int &scaled_width, int &scaled_height ) const;
	MakeDefault(): void { throw "placeholder";}	// fill with a grid pattern
//	void		SetImageFilterAndRepeat() const;
	ShouldImageBePartialCached():boolean { throw "placeholder"; }
//	void		WritePrecompressedImage();
	CheckPrecompressedImage( fullLoad: boolean ):boolean { throw "placeholder"; }
//	void		UploadPrecompressedImage( byte *data, int len );
	ActuallyLoadImage(checkForPrecompressed: boolean, fromBackEnd: boolean): void { throw "placeholder";}
//	void		StartBackgroundImageLoad();
//	int			BitsForInternalFormat( int internalFormat ) const;
//	void		UploadCompressedNormalMap( int width, int height, const byte *rgba, int mipLevel );
//	GLenum		SelectInternalFormat( const byte **dataPtrs, int numDataPtrs, int width, int height,
//									 textureDepth_t minimumDepth ) const;
//	void		ImageProgramStringToCompressedFileName( const char *imageProg, char *fileName ) const;
//	int			NumLevelsForImageSize( int width, int height ) const;

	// data commonly accessed is grouped here
	static TEXTURE_NOT_LOADED:number = -1;
/*	GLuint				*/texnum:number;					// gl texture binding, will be TEXTURE_NOT_LOADED if not loaded
	type: textureType_t;
	/*	int					*/frameUsed: number;				// for texture usage in frame statistics
/*	int					*/bindCount:number;			// incremented each bind

	// background loading information
	partialImage: idImage	;			// shrunken, space-saving version
	isPartialImage:boolean;			// true if this is pointed to by another image
	backgroundLoadInProgress:boolean;	// true if another thread is reading the complete d3t file
	bgl:backgroundDownload_t;
	bglNext: idImage;				// linked from tr.backgroundImageLoads

//	// parameters that define this image
	imgName:idStr;								// game path, including extension (except for cube maps), may be an image program
	generatorFunction:(image:idImage)=> void;	// NULL for files
	allowDownSize:boolean;			// this also doubles as a don't-partially-load flag
	filter: textureFilter_t;
	repeat: textureRepeat_t;
	depth: textureDepth_t;
	cubeFiles: cubeFiles_t;				// determines the naming and flipping conventions for the six images

    referencedOutsideLevelLoad:boolean;
    levelLoadReferenced:boolean;	            // for determining if it needs to be purged
    precompressedFile:boolean;		            // true when it was loaded from a .d3t file
    defaulted:boolean;				            // true if the default image was generated because a file couldn't be loaded
/*	ID_TIME_T			*/	timestamp:number;				// the most recent of all images used in creation, for reloadImages command

	/*	int					*/imageHash: number;				// for identical-image checking

	/*	int					*/classification: number;			// just for resource profiling

	// data for listImages
/*	int					*/uploadWidth:number; uploadHeight:number; uploadDepth: number;	// after power of two, downsample, and MAX_TEXTURE_SIZE
/*int					*/internalFormat:number;

	cacheUsagePrev: idImage; cacheUsageNext: idImage;	// for dynamic cache purging of old images

	hashNext:idImage;							// for hash chains to speed lookup

/*	int					*/refCount:number;				// overall ref count

	constructor() {
		this.texnum = idImage.TEXTURE_NOT_LOADED;
		this.partialImage = null;
		this.type = textureType_t.TT_DISABLED;
		this.isPartialImage = false;
		this.frameUsed = 0;
		this.classification = 0;
		this.backgroundLoadInProgress = false;
		this.bgl = new backgroundDownload_t ( );
		this.bgl.opcode = dlType_t.DLTYPE_FILE;
		this.bgl.f = null;
		this.bglNext = null;
		this.imgName = new idStr("");
		this.generatorFunction = null;
		this.allowDownSize = false;
		this.filter = textureFilter_t.TF_DEFAULT;
		this.repeat = textureRepeat_t.TR_REPEAT;
		this.depth = textureDepth_t.TD_DEFAULT;
		this.cubeFiles = cubeFiles_t.CF_2D;
		this.referencedOutsideLevelLoad = false;
		this.levelLoadReferenced = false;
		this.precompressedFile = false;
		this.defaulted = false;
		this.timestamp = 0;
		this.bindCount = 0;
		this.uploadWidth = this.uploadHeight = this.uploadDepth = 0;
		this.internalFormat = 0;
		this.cacheUsagePrev = this.cacheUsageNext = null;
		this.hashNext = null;
		this.refCount = 0;
	}

};


////// data is RGBA
////void	R_WriteTGA( const char *filename, const byte *data, int width, int height, bool flipVertical = false );
////// data is an 8 bit index into palette, which is RGB (no A)
////void	R_WritePalTGA( const char *filename, const byte *data, const byte *palette, int width, int height, bool flipVertical = false );
////// data is in top-to-bottom raster order unless flipVertical is set

class idImageManager {
    // new ones
    R_DefaultImage(image:idImage):void {throw "placeholder";}
    R_WhiteImage(image:idImage):void {throw "placeholder";}
    R_BlackImage(image:idImage):void {throw "placeholder";}
    R_BorderClampImage(image:idImage):void {throw "placeholder";}
    R_FlatNormalImage(image:idImage):void {throw "placeholder";}
    R_AmbientNormalImage(image:idImage):void {throw "placeholder";}
    R_SpecularTableImage(image:idImage):void {throw "placeholder";}
    R_Specular2DTableImage(image:idImage):void {throw "placeholder";}
    R_RampImage(image:idImage):void {throw "placeholder";}
    R_AlphaNotchImage(image:idImage):void {throw "placeholder";}
    R_FogImage(image:idImage):void {throw "placeholder";}
    R_FogEnterImage(image:idImage):void {throw "placeholder";}
    makeNormalizeVectorCubeMap(image:idImage):void {throw "placeholder";}
    R_CreateNoFalloffImage(image:idImage):void {throw "placeholder";}
    R_QuadraticImage(image:idImage):void {throw "placeholder";}



    R_ReloadImages_f(image:idImage):void{throw "placeholder";}
    //R_QsortImageSizes(/*?*/):void {throw "placeholder";}
    R_ListImages_f(args:idCmdArgs):void {throw "placeholder";}
    //SetNormalPalette():void {throw "placeholder";}
    R_CombineCubeImages_f(args:idCmdArgs):void {throw "placeholder";} 


    Init():void {throw "placeholder";}
        
    ////	void				Shutdown();

    ////	// If the exact combination of parameters has been asked for already, an existing
    ////	// image will be returned, otherwise a new image will be created.
    ////	// Be careful not to use the same image file with different filter / repeat / etc parameters
    ////	// if possible, because it will cause a second copy to be loaded.
    ////	// If the load fails for any reason, the image will be filled in with the default
    ////	// grid pattern.
    ////	// Will automatically resample non-power-of-two images and execute image programs if needed.
	ImageFromFile(name: string, filter: textureFilter_t, allowDownSize:boolean,
		repeat: textureRepeat_t, depth: textureDepth_t, cubeMapL: cubeFiles_t = cubeFiles_t.CF_2D): idImage { throw "placeholder"; }

    ////	// look for a loaded image, whatever the parameters
    ////	idImage *			GetImage( const char *name ) const;

    ////	// The callback will be issued immediately, and later if images are reloaded or vid_restart
    ////	// The callback function should call one of the idImage::Generate* functions to fill in the data
    ImageFromFunction( /*const char **/_name: string, generatorFunction: (image: idImage)=>void): idImage {throw "placeholder";}

    ////	// called once a frame to allow any background loads that have been completed
    ////	// to turn into textures.
    ////	void				CompleteBackgroundImageLoads();

    ////	// returns the number of bytes of image data bound in the previous frame
    ////	int					SumOfUsedImages();

    ////	// called each frame to allow some cvars to automatically force changes
    ////	void				CheckCvars();

    ////	// purges all the images before a vid_restart
    ////	void				PurgeAllImages();

    ////	// reloads all apropriate images after a vid_restart
    ////	void				ReloadAllImages();

    ////	// disable the active texture unit
    ////	void				BindNull();

    ////	// Mark all file based images as currently unused,
    ////	// but don't free anything.  Calls to ImageFromFile() will
    ////	// either mark the image as used, or create a new image without
    ////	// loading the actual data.
    ////	// Called only by renderSystem::BeginLevelLoad
    ////	void				BeginLevelLoad();

    ////	// Free all images marked as unused, and load all images that are necessary.
    ////	// This architecture prevents us from having the union of two level's
    ////	// worth of data present at one time.
    ////	// Called only by renderSystem::EndLevelLoad
    ////	void				EndLevelLoad();

    ////	// used to clear and then write the dds conversion batch file
    ////	void				StartBuild();
    ////	void				FinishBuild( bool removeDups = false );
    ////	void				AddDDSCommand( const char *cmd );

    ////	void				PrintMemInfo( MemInfo_t *mi );

    // built-in images
    defaultImage: idImage;
    flatNormalMap:idImage;				// 128 128 255 in all pixels
    ambientNormalMap:idImage;			// tr.ambientLightVector encoded in all pixels
    rampImage:idImage;					// 0-255 in RGBA in S
    alphaRampImage:idImage;				// 0-255 in alpha, 255 in RGB
    alphaNotchImage:idImage;			// 2x1 texture with just 1110 and 1111 with point sampling
    whiteImage:idImage;					// full of 0xff
    blackImage:idImage;					// full of 0x00
    normalCubeMapImage:idImage;			// cube map to normalize STR into RGB
    noFalloffImage:idImage;				// all 255, but zero clamped
    fogImage:idImage;					// increasing alpha is denser fog
    fogEnterImage:idImage;				// adjust fogImage alpha based on terminator plane
    cinematicImage:idImage;
    scratchImage:idImage;
    scratchImage2:idImage;
    accumImage:idImage;
    currentRenderImage:idImage;			// for SS_POST_PROCESS shaders
    scratchCubeMapImage:idImage;
    specularTableImage:idImage;			// 1D intensity texture with our specular function
    specular2DTableImage:idImage;		// 2D intensity texture with our specular function with variable specularity
    borderClampImage:idImage;			// white inside, black outside

    //--------------------------------------------------------

	AllocImage(name: string): idImage { throw "placeholder"; }
    ////	void				SetNormalPalette();
    ////	void				ChangeTextureFilter();

    images:idList<idImage>;
    ddsList:idStrList;
    ddsHash:idHashIndex;

    insideLevelLoad:boolean;			// don't actually load images now

    originalToCompressed:Uint8Array/*[256]*/;	// maps normal maps to 8 bit textures
    compressedPalette:Uint8Array/*[768]*/;		// the palette that normal maps use

    // default filter modes for images
    /*GLenum		*/	textureMinFilter:number;
	/*GLenum		*/	textureMaxFilter: number;
	/*float			*/	textureAnisotropy: number;
	/*float			*/	textureLODBias: number;

    imageHashTable:Array<idImage>;

	backgroundImageLoads: idImage;		// chain of images that have background file loads active
    cacheLRU:idImage;					// head/tail of doubly linked list
    /*int					*/totalCachedImageSize:number;		// for determining when something should be purged

    /*int	*/numActiveBackgroundImageLoads:number;
    /*const static int */static MAX_BACKGROUND_IMAGE_LOADS = 8;

    constructor() {

        //built-in images
        this.defaultImage=null;
        this.flatNormalMap=null;				// 128 128 255 in all pixels
        this.ambientNormalMap=null;			// tr.ambientLightVector encoded in all pixels
        this.rampImage=null;					// 0-255 in RGBA in S
        this.alphaRampImage=null;				// 0-255 in alpha, 255 in RGB
        this.alphaNotchImage=null;			// 2x1 texture with just 1110 and 1111 with point sampling
        this.whiteImage=null;					// full of 0xff
        this.blackImage=null;					// full of 0x00
        this.normalCubeMapImage=null;			// cube map to normalize STR into RGB
        this.noFalloffImage=null;				// all 255, but zero clamped
        this.fogImage=null;					// increasing alpha is denser fog
        this.fogEnterImage=null;				// adjust fogImage alpha based on terminator plane
        this.cinematicImage=null;
        this.scratchImage=null;
        this.scratchImage2=null;
        this.accumImage=null;
        this.currentRenderImage=null;			// for SS_POST_PROCESS shaders
        this.scratchCubeMapImage=null;
        this.specularTableImage=null;			// 1D intensity texture with our specular function
        this.specular2DTableImage=null;		// 2D intensity texture with our specular function with variable specularity
        this.borderClampImage=null;			// white inside, black outside

	    this.images = new idList<idImage>( idImage );
//	idStrList			this.ddsList;
//	idHashIndex			this.ddsHash=null;

//	bool				this.insideLevelLoad=false;			// don't actually load images now

//	byte				this.originalToCompressed[256];	// maps normal maps to 8 bit textures
//	byte				this.compressedPalette[768];		// the palette that normal maps use

//	// default filter modes for images
//	GLenum				this.textureMinFilter;
//	GLenum				this.textureMaxFilter;
//	float				this.textureAnisotropy;
//	float				this.textureLODBias;

        this.imageHashTable = newStructArray<idImage>(idImage, FILE_HASH_SIZE);

//	idImage *			this.backgroundImageLoads;		// chain of images that have background file loads active
    this.cacheLRU = new idImage();					// head/tail of doubly linked list
//	int					this.totalCachedImageSize;		// for determining when something should be purged

//	int	numActiveBackgroundImageLoads;
    }

	
	static image_filter = new idCVar( "image_filter", imageFilter[1], CVAR_RENDERER | CVAR_ARCHIVE, "changes texture filtering on mipmapped images", imageFilter, ArgCompletion_String_Template(imageFilter)  );
	static image_anisotropy = new idCVar( "image_anisotropy", "1", CVAR_RENDERER | CVAR_ARCHIVE, "set the maximum texture anisotropy if available" );
	static image_lodbias = new idCVar( "image_lodbias", "0", CVAR_RENDERER | CVAR_ARCHIVE, "change lod bias on mipmapped images" );
	static image_downSize = new idCVar( "image_downSize", "0", CVAR_RENDERER | CVAR_ARCHIVE, "controls texture downsampling" );
	static image_forceDownSize = new idCVar( "image_forceDownSize", "0", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_BOOL, "" );
	static image_roundDown = new idCVar( "image_roundDown", "1", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_BOOL, "round bad sizes down to nearest power of two" );
	static image_colorMipLevels = new idCVar( "image_colorMipLevels", "0", CVAR_RENDERER | CVAR_BOOL, "development aid to see texture mip usage" );
	static image_preload  = new idCVar( "image_preload", "1", CVAR_RENDERER | CVAR_BOOL | CVAR_ARCHIVE, "if 0, dynamically load all images" );
	static image_useCompression = new idCVar( "image_useCompression", "1", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_BOOL, "0  = force everything to high quality" );
	static image_useAllFormats = new idCVar( "image_useAllFormats", "1", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_BOOL, "allow alpha/intensity/luminance/luminance+alpha" );
	static image_useNormalCompression = new idCVar( "image_useNormalCompression", "2", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_INTEGER, "2  = use rxgb compression for normal maps, 1  = use 256 color compression for normal maps if available" );
	static image_usePrecompressedTextures = new idCVar( "image_usePrecompressedTextures", "1", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_BOOL, "use .dds files if present" );
	static image_writePrecompressedTextures = new idCVar( "image_writePrecompressedTextures", "0", CVAR_RENDERER | CVAR_BOOL, "write .dds files if necessary" );
	static image_writeNormalTGA = new idCVar( "image_writeNormalTGA", "0", CVAR_RENDERER | CVAR_BOOL, "write .tgas of the final normal maps for debugging" );
	static image_writeNormalTGAPalletized = new idCVar( "image_writeNormalTGAPalletized", "0", CVAR_RENDERER | CVAR_BOOL, "write .tgas of the final palletized normal maps for debugging" );
	static image_writeTGA = new idCVar( "image_writeTGA", "0", CVAR_RENDERER | CVAR_BOOL, "write .tgas of the non normal maps for debugging" );
	static image_useOffLineCompression = new idCVar( "image_useOfflineCompression", "0", CVAR_RENDERER | CVAR_BOOL, "write a batch file for offline compression of DDS files" );
	static image_cacheMinK = new idCVar( "image_cacheMinK", "200", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_INTEGER, "maximum KB of precompressed files to read at specification time" );
	static image_cacheMegs = new idCVar( "image_cacheMegs", "20", CVAR_RENDERER | CVAR_ARCHIVE, "maximum MB set aside for temporary loading of full-sized precompressed images" );
	static image_useCache = new idCVar( "image_useCache", "0", CVAR_RENDERER | CVAR_ARCHIVE | CVAR_BOOL, "1  = do background load image caching" );
	static image_showBackgroundLoads = new idCVar( "image_showBackgroundLoads", "0", CVAR_RENDERER | CVAR_BOOL, "1  = print number of outstanding background loads" );
	static image_downSizeSpecular = new idCVar( "image_downSizeSpecular", "0", CVAR_RENDERER | CVAR_ARCHIVE, "controls specular downsampling" );
	static image_downSizeBump = new idCVar( "image_downSizeBump", "0", CVAR_RENDERER | CVAR_ARCHIVE, "controls normal map downsampling" );
	static image_downSizeSpecularLimit = new idCVar( "image_downSizeSpecularLimit", "64", CVAR_RENDERER | CVAR_ARCHIVE, "controls specular downsampled limit" );
	static image_downSizeBumpLimit = new idCVar( "image_downSizeBumpLimit", "128", CVAR_RENDERER | CVAR_ARCHIVE, "controls normal map downsample limit" );
	static image_ignoreHighQuality = new idCVar( "image_ignoreHighQuality", "0", CVAR_RENDERER | CVAR_ARCHIVE, "ignore high quality setting on materials" );
	static image_downSizeLimit = new idCVar( "image_downSizeLimit", "256", CVAR_RENDERER | CVAR_ARCHIVE, "controls diffuse map downsample limit" ); 
};
////extern idImageManager	*globalImages;		// pointer to global list for the rest of the system

////int MakePowerOfTwo( int num );

/////*
////====================================================================

////IMAGEPROCESS

////FIXME: make an "imageBlock" type to hold byte*,width,height?
////====================================================================
////*/

////byte *R_Dropsample( const byte *in, int inwidth, int inheight,  
////							int outwidth, int outheight );
////byte *R_ResampleTexture( const byte *in, int inwidth, int inheight,  
////							int outwidth, int outheight );
////byte *R_MipMapWithAlphaSpecularity( const byte *in, int width, int height );
////byte *R_MipMap( const byte *in, int width, int height, bool preserveBorder );
////byte *R_MipMap3D( const byte *in, int width, int height, int depth, bool preserveBorder );

////// these operate in-place on the provided pixels
////void R_SetBorderTexels( byte *inBase, int width, int height, const byte border[4] );
////void R_SetBorderTexels3D( byte *inBase, int width, int height, int depth, const byte border[4] );
////void R_BlendOverTexture( byte *data, int pixelCount, const byte blend[4] );
////void R_HorizontalFlip( byte *data, int width, int height );
////void R_VerticalFlip( byte *data, int width, int height );
////void R_RotatePic( byte *data, int width );

/////*
////====================================================================

////IMAGEFILES

////====================================================================
////*/

////void R_LoadImage( const char *name, byte **pic, int *width, int *height, ID_TIME_T *timestamp, bool makePowerOf2 );
////// pic is in top to bottom raster format
////bool R_LoadCubeImages( const char *cname, cubeFiles_t extensions, byte *pic[6], int *size, ID_TIME_T *timestamp );

/////*
////====================================================================

////IMAGEPROGRAM

////====================================================================
////*/

////void R_LoadImageProgram( const char *name, byte **pic, int *width, int *height, ID_TIME_T *timestamp, textureDepth_t *depth = NULL );
////const char *R_ParsePastImageProgram( idLexer &src );

