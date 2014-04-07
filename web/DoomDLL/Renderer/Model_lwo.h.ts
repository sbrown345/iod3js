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

////#ifndef __LWO2_H__
////#define __LWO2_H__

/////*
////======================================================================

////	LWO2 loader. (LightWave Object)

////	Ernie Wright  17 Sep 00

////======================================================================
////*/

/////* chunk and subchunk IDs */

function LWID_ ( a: string, b: string, c: string, d: string ): number { return ( ( a.charCodeAt( 0 ) ) << 24 ) | ( ( b.charCodeAt( 0 ) ) << 16 ) | ( ( c.charCodeAt( 0 ) ) << 8 ) | ( d.charCodeAt( 0 ) ); }

var ID_FORM = LWID_('F','O','R','M')
var ID_LWO2 = LWID_('L','W','O','2')
var ID_LWOB = LWID_('L','W','O','B')

/* top-level chunks */
var ID_LAYR  = LWID_('L','A','Y','R')
var ID_TAGS  = LWID_('T','A','G','S')
var ID_PNTS  = LWID_('P','N','T','S')
var ID_BBOX  = LWID_('B','B','O','X')
var ID_VMAP  = LWID_('V','M','A','P')
var ID_VMAD  = LWID_('V','M','A','D')
var ID_POLS  = LWID_('P','O','L','S')
var ID_PTAG  = LWID_('P','T','A','G')
var ID_ENVL  = LWID_('E','N','V','L')
var ID_CLIP  = LWID_('C','L','I','P')
var ID_SURF  = LWID_('S','U','R','F')
var ID_DESC  = LWID_('D','E','S','C')
var ID_TEXT  = LWID_('T','E','X','T')
var ID_ICON  = LWID_('I','C','O','N')

/* polygon types */
var ID_FACE  = LWID_('F','A','C','E')
var ID_CURV  = LWID_('C','U','R','V')
var ID_PTCH  = LWID_('P','T','C','H')
var ID_MBAL  = LWID_('M','B','A','L')
var ID_BONE  = LWID_('B','O','N','E')

/* polygon tags */
var ID_SURF  = LWID_('S','U','R','F')
var ID_PART  = LWID_('P','A','R','T')
var ID_SMGP  = LWID_('S','M','G','P')

/* envelopes */
var ID_PRE   = LWID_('P','R','E',' ')
var ID_POST  = LWID_('P','O','S','T')
var ID_KEY   = LWID_('K','E','Y',' ')
var ID_SPAN  = LWID_('S','P','A','N')
var ID_TCB   = LWID_('T','C','B',' ')
var ID_HERM  = LWID_('H','E','R','M')
var ID_BEZI  = LWID_('B','E','Z','I')
var ID_BEZ2  = LWID_('B','E','Z','2')
var ID_LINE  = LWID_('L','I','N','E')
var ID_STEP  = LWID_('S','T','E','P')

/* clips */
var ID_STIL  = LWID_('S','T','I','L')
var ID_ISEQ  = LWID_('I','S','E','Q')
var ID_ANIM  = LWID_('A','N','I','M')
var ID_XREF  = LWID_('X','R','E','F')
var ID_STCC  = LWID_('S','T','C','C')
var ID_TIME  = LWID_('T','I','M','E')
var ID_CONT  = LWID_('C','O','N','T')
var ID_BRIT  = LWID_('B','R','I','T')
var ID_SATR  = LWID_('S','A','T','R')
var ID_HUE   = LWID_('H','U','E',' ')
var ID_GAMM  = LWID_('G','A','M','M')
var ID_NEGA  = LWID_('N','E','G','A')
var ID_IFLT  = LWID_('I','F','L','T')
var ID_PFLT  = LWID_('P','F','L','T')

/* surfaces */
var ID_COLR  = LWID_('C','O','L','R')
var ID_LUMI  = LWID_('L','U','M','I')
var ID_DIFF  = LWID_('D','I','F','F')
var ID_SPEC  = LWID_('S','P','E','C')
var ID_GLOS  = LWID_('G','L','O','S')
var ID_REFL  = LWID_('R','E','F','L')
var ID_RFOP  = LWID_('R','F','O','P')
var ID_RIMG  = LWID_('R','I','M','G')
var ID_RSAN  = LWID_('R','S','A','N')
var ID_TRAN  = LWID_('T','R','A','N')
var ID_TROP  = LWID_('T','R','O','P')
var ID_TIMG  = LWID_('T','I','M','G')
var ID_RIND  = LWID_('R','I','N','D')
var ID_TRNL  = LWID_('T','R','N','L')
var ID_BUMP  = LWID_('B','U','M','P')
var ID_SMAN  = LWID_('S','M','A','N')
var ID_SIDE  = LWID_('S','I','D','E')
var ID_CLRH  = LWID_('C','L','R','H')
var ID_CLRF  = LWID_('C','L','R','F')
var ID_ADTR  = LWID_('A','D','T','R')
var ID_SHRP  = LWID_('S','H','R','P')
var ID_LINE  = LWID_('L','I','N','E')
var ID_LSIZ  = LWID_('L','S','I','Z')
var ID_ALPH  = LWID_('A','L','P','H')
var ID_AVAL  = LWID_('A','V','A','L')
var ID_GVAL  = LWID_('G','V','A','L')
var ID_BLOK  = LWID_('B','L','O','K')

/* texture layer */
var ID_TYPE  = LWID_('T','Y','P','E')
var ID_CHAN  = LWID_('C','H','A','N')
var ID_NAME  = LWID_('N','A','M','E')
var ID_ENAB  = LWID_('E','N','A','B')
var ID_OPAC  = LWID_('O','P','A','C')
var ID_FLAG  = LWID_('F','L','A','G')
var ID_PROJ  = LWID_('P','R','O','J')
var ID_STCK  = LWID_('S','T','C','K')
var ID_TAMP  = LWID_('T','A','M','P')

/* texture coordinates */
var ID_TMAP  = LWID_('T','M','A','P')
var ID_AXIS  = LWID_('A','X','I','S')
var ID_CNTR  = LWID_('C','N','T','R')
var ID_SIZE  = LWID_('S','I','Z','E')
var ID_ROTA  = LWID_('R','O','T','A')
var ID_OREF  = LWID_('O','R','E','F')
var ID_FALL  = LWID_('F','A','L','L')
var ID_CSYS  = LWID_('C','S','Y','S')

/* image map */
var ID_IMAP  = LWID_('I','M','A','P')
var ID_IMAG  = LWID_('I','M','A','G')
var ID_WRAP  = LWID_('W','R','A','P')
var ID_WRPW  = LWID_('W','R','P','W')
var ID_WRPH  = LWID_('W','R','P','H')
var ID_VMAP  = LWID_('V','M','A','P')
var ID_AAST  = LWID_('A','A','S','T')
var ID_PIXB  = LWID_('P','I','X','B')

/* procedural */
var ID_PROC  = LWID_('P','R','O','C')
var ID_COLR  = LWID_('C','O','L','R')
var ID_VALU  = LWID_('V','A','L','U')
var ID_FUNC  = LWID_('F','U','N','C')
var ID_FTPS  = LWID_('F','T','P','S')
var ID_ITPS  = LWID_('I','T','P','S')
var ID_ETPS  = LWID_('E','T','P','S')

/* gradient */
var ID_GRAD  = LWID_('G','R','A','D')
var ID_GRST  = LWID_('G','R','S','T')
var ID_GREN  = LWID_('G','R','E','N')
var ID_PNAM  = LWID_('P','N','A','M')
var ID_INAM  = LWID_('I','N','A','M')
var ID_GRPT  = LWID_('G','R','P','T')
var ID_FKEY  = LWID_('F','K','E','Y')
var ID_IKEY  = LWID_('I','K','E','Y')

/* shader */
var ID_SHDR  = LWID_('S','H','D','R')
var ID_DATA  = LWID_('D','A','T','A')


/* generic linked list */

class lwNode {
	next:lwNode; prev: lwNode;
////   void *data;
};


/////* plug-in reference */

////class lwPlugin {
////   struct st_lwPlugin *next, *prev;
////   char          *ord;
////   char          *name;
////   int            flags;
////   void          *data;
////};


/////* envelopes */

////class lwKey {
////   struct st_lwKey *next, *prev;
////   float          value;
////   float          time;
////   unsigned int   shape;               /* ID_TCB, ID_BEZ2, etc. */
////   float          tension;
////   float          continuity;
////   float          bias;
////   float          param[ 4 ];
////} lwKey;

class lwEnvelope {
////   struct st_lwEnvelope *next, *prev;
////   int            index;
////   int            type;
////   char          *name;
////   lwKey         *key;                 /* linked list of keys */
////   int            nkeys;
////   int            behavior[ 2 ];       /* pre and post (extrapolation) */
////   lwPlugin      *cfilter;             /* linked list of channel filters */
////   int            ncfilters;
} ;

var BEH_RESET     =0
var BEH_CONSTANT  =1
var BEH_REPEAT    =2
var BEH_OSCILLATE =3
var BEH_OFFSET    =4
var BEH_LINEAR    =5


/////* values that can be enveloped */

////class lwEParam{
////   float          val;
////   int            eindex;
////} ;

////class lwVParam {
////   float          val[ 3 ];
////   int            eindex;
////} ;


/////* clips */

////class lwClipStill {
////   char          *name;
////} ;

////class lwClipSeq {
////   char          *prefix;              /* filename before sequence digits */
////   char          *suffix;              /* after digits, e.g. extensions */
////   int            digits;
////   int            flags;
////   int            offset;
////   int            start;
////   int            end;
////} lwClipSeq;

////class lwClipAnim {
////   char          *name;
////   char          *server;              /* anim loader plug-in */
////   void          *data;
////} ;

////class lwClipXRef {
////   char          *string;
////   int            index;
////   struct st_lwClip *clip;
////} ;

////class lwClipCycle {
////   char          *name;
////   int            lo;
////   int            hi;
////} ;

class lwClip {
////   struct st_lwClip *next, *prev;
////   int            index;
////   unsigned int   type;                /* ID_STIL, ID_ISEQ, etc. */
////   union {
////      lwClipStill    still;
////      lwClipSeq      seq;
////      lwClipAnim     anim;
////      lwClipXRef     xref;
////      lwClipCycle    cycle;
////   }              source;
////   float          start_time;
////   float          duration;
////   float          frame_rate;
////   lwEParam       contrast;
////   lwEParam       brightness;
////   lwEParam       saturation;
////   lwEParam       hue;
////   lwEParam       gamma;
////   int            negative;
////   lwPlugin      *ifilter;             /* linked list of image filters */
////   int            nifilters;
////   lwPlugin      *pfilter;             /* linked list of pixel filters */
////   int            npfilters;
}


/////* textures */

////class lwTMap {
////   lwVParam       size;
////   lwVParam       center;
////   lwVParam       rotate;
////   lwVParam       falloff;
////   int            fall_type;
////   char          *ref_object;
////   int            coord_sys;
////} lwTMap;

////class lwImageMap {
////   int            cindex;
////   int            projection;
////   char          *vmap_name;
////   int            axis;
////   int            wrapw_type;
////   int            wraph_type;
////   lwEParam       wrapw;
////   lwEParam       wraph;
////   float          aa_strength;
////   int            aas_flags;
////   int            pblend;
////   lwEParam       stck;
////   lwEParam       amplitude;
////} lwImageMap;

var PROJ_PLANAR      = 0
var PROJ_CYLINDRICAL = 1
var PROJ_SPHERICAL   = 2
var PROJ_CUBIC       = 3
var PROJ_FRONT       = 4

var WRAP_NONE    =0
var WRAP_EDGE    =1
var WRAP_REPEAT  =2
var WRAP_MIRROR  =3

////class lwProcedural {
////   int            axis;
////   float          value[ 3 ];
////   char          *name;
////   void          *data;
////} lwProcedural;

////class lwGradKey {
////   struct st_lwGradKey *next, *prev;
////   float          value;
////   float          rgba[ 4 ];
////} lwGradKey;

////typedef struct st_lwGradient {
////   char          *paramname;
////   char          *itemname;
////   float          start;
////   float          end;
////   int            repeat;
////   lwGradKey     *key;                 /* array of gradient keys */
////   short         *ikey;                /* array of interpolation codes */
////} lwGradient;

////class lwTexture {
////   struct st_lwTexture *next, *prev;
////   char          *ord;
////   unsigned int   type;
////   unsigned int   chan;
////   lwEParam       opacity;
////   short          opac_type;
////   short          enabled;
////   short          negative;
////   short          axis;
////   union {
////      lwImageMap     imap;
////      lwProcedural   proc;
////      lwGradient     grad;
////   }              param;
////   lwTMap         tmap;
////} lwTexture;


/////* values that can be textured */

////class lwTParam{
////   float          val;
////   int            eindex;
////   lwTexture     *tex;                 /* linked list of texture layers */
////} lwTParam;

////typedef struct st_lwCParam {
////   float          rgb[ 3 ];
////   int            eindex;
////   lwTexture     *tex;                 /* linked list of texture layers */
////} lwCParam;


/////* surfaces */

////class Glow {
////   short          enabled;
////   short          type;
////   lwEParam       intensity;
////   lwEParam       size;
////} Glow;

///class lwRMap {
////   lwTParam       val;
////   int            options: number /*int*/;
////   int            cindex: number /*int*/;
////   float          seam_angle;
////} lwRMap;

////class lwLine {
////   short          enabled;
////   unsigned short flags;
////   lwEParam       size;
////} lwLine;

class lwSurface {
////   struct st_lwSurface *next, *prev;
////   char          *name;
////   char          *srcname;
////   lwCParam       color;
////   lwTParam       luminosity;
////   lwTParam       diffuse;
////   lwTParam       specularity;
////   lwTParam       glossiness;
////   lwRMap         reflection;
////   lwRMap         transparency;
////   lwTParam       eta;
////   lwTParam       translucency;
////   lwTParam       bump;
////   float          smooth;
////   int            sideflags: number /*int*/;
////   float          alpha;
////   int            alpha_mode: number /*int*/;
////   lwEParam       color_hilite;
////   lwEParam       color_filter;
////   lwEParam       add_trans;
////   lwEParam       dif_sharp;
////   lwEParam       glow;
////   lwLine         line;
////   lwPlugin      *shader;              /* linked list of shaders */
////   int            nshaders: number /*int*/;
}


/////* vertex maps */

class lwVMap {
////   struct st_lwVMap *next, *prev;
////   char          *name;
////   unsigned int   type: number /*unsigned int*/;
////   int            dim: number /*int*/;
////   int            nverts: number /*int*/;
////   int            perpoly: number /*int*/;
////   int           *vindex;              /* array of point indexes */
////   int           *pindex;              /* array of polygon indexes */
////   float        **val;

////   // added by duffy
////   int			offset: number /*int*/;
}

class lwVMapPt {
	vmap: lwVMap;
	index: number /*int*/; /* vindex or pindex element */
}


/* points and polygons */

class lwPoint {
	pos = new Float32Array( 3 )
	npols: number /*int*/; /* number of polygons sharing the point */
	pol: number[] /*int*/; /* array of polygon indexes */
	nvmaps: number /*int*/;
	vm: lwVMapPt[]; /* array of vmap references */

	memset0 ( ): void {
		this.pos[0] = this.pos[1] = this.pos[2] = 0;
		this.npols = 0;
		this.pol = null;
		this.nvmaps = 0;
		this.vm = null;
	}
}

////typedef struct st_lwPolVert {
////   int            index: number /*int*/;               /* index into the point array */
////   float          norm[ 3 ];
////   int            nvmaps: number /*int*/;
////   lwVMapPt      *vm;                  /* array of vmap references */
////} lwPolVert;

////class lwPolygon {
////   lwSurface     *surf;
////   int            part: number /*int*/;                /* part index */
////   int            smoothgrp: number /*int*/;           /* smoothing group */
////   int            flags: number /*int*/;
////   unsigned int   type;
////   float          norm[ 3 ];
////   int            nverts: number /*int*/;
////   lwPolVert     *v;                   /* array of vertex records */
////} lwPolygon;

class lwPointList {
	count: number /*int*/;
	offset: number /*int*/; /* only used during reading */
	pt: lwPoint[]; /* array of points */

	memset0 ( ): void {
		this.count = 0;
		this.offset = 0;
		this.pt = null;
	}
}

class lwPolygonList {
	count: number /*int*/;
	offset: number /*int*/;              /* only used during reading */
	vcount: number /*int*/;              /* total number of vertices */
	voffset: number /*int*/;             /* only used during reading */
	//pol:lwPolygon;                 /* array of polygons */

	memset0 ( ): void {
		this.count = 0;
		this.offset = 0;
		this.vcount = 0;
		this.voffset = 0;
		//this.pol = null;
	}
}


/* geometry layers */

class lwLayer {
	next: lwLayer;
	prev: lwLayer;
	name: string;
	index: number /*int*/;
	parent: number /*int*/;
	flags: number /*int*/;
	pivot = new Float32Array( 3 );
	bbox = new Float32Array( 6 );
	point = new lwPointList;
	polygon = new lwPolygonList;
	nvmaps: number /*int*/;
	vmap: lwVMap; /* linked list of vmaps */


	memset0(): void {
		this.next = null;
		this.prev = null;
		this.name = null;
		this.index= 0;
		this.parent= 0;
		this.flags = 0;
		memset( this.pivot, 0, sizeof( this.pivot ) );
		memset(this.bbox, 0, sizeof(this.bbox ) );
		this.point.memset0 ( );
		this.polygon.memset0 ( );
		this.nvmaps= 0;
		this.vmap = null;
	}
};


/* tag strings */

class lwTagList {
	count: number /*int*/;
	offset: number /*int*/; /* only used during reading */
	tag: Uint8Array[] //char         **tag;                 /* array of strings */	

	memset0 ( ): void {
		this.count = 0;
		this.offset = 0;
		this.tag = null;
	}
}


/* an object */

class lwObject {
	timeStamp: number /*ID_TIME_T*/;
	layer: lwLayer;               /* linked list of layers */
	env: lwEnvelope;                 /* linked list of envelopes */
	clip: lwClip;                /* linked list of clips */
	surf: lwSurface;                /* linked list of surfaces */
	taglist = new lwTagList;
	nlayers: number /*int*/;
	nenvs: number /*int*/;
	nclips: number /*int*/;
	nsurfs: number /*int*/;

	memset0 ( ): void {
		this.timeStamp = 0;
		this.layer = null;
		this.env = null;
		this.clip = null;
		this.surf = null;
		this.taglist.memset0();
		this.nlayers = this.nenvs = this.nclips = this.nsurfs = 0;
	}
};


/////* lwo2.c */

////void lwFreeLayer( lwLayer *layer );
////void lwFreeObject( lwObject *object );
////lwObject *lwGetObject( const char *filename, unsigned int *failID, int *failpos );

/////* pntspols.c */

////void lwFreePoints( lwPointList *point );
////void lwFreePolygons( lwPolygonList *plist );
////int lwGetPoints( idFile *fp, int cksize, lwPointList *point );
////void lwGetBoundingBox( lwPointList *point, float bbox[] );
////int lwAllocPolygons( lwPolygonList *plist, int npols, int nverts );
////int lwGetPolygons( idFile *fp, int cksize, lwPolygonList *plist, int ptoffset );
////void lwGetPolyNormals( lwPointList *point, lwPolygonList *polygon );
////int lwGetPointPolygons( lwPointList *point, lwPolygonList *polygon );
////int lwResolvePolySurfaces( lwPolygonList *polygon, lwTagList *tlist,
////   lwSurface **surf, int *nsurfs );
////void lwGetVertNormals( lwPointList *point, lwPolygonList *polygon );
////void lwFreeTags( lwTagList *tlist );
////int lwGetTags( idFile *fp, int cksize, lwTagList *tlist );
////int lwGetPolygonTags( idFile *fp, int cksize, lwTagList *tlist,
////   lwPolygonList *plist );

/////* vmap.c */

////void lwFreeVMap( lwVMap *vmap );
////lwVMap *lwGetVMap( idFile *fp, int cksize, int ptoffset, int poloffset,
////   int perpoly );
////int lwGetPointVMaps( lwPointList *point, lwVMap *vmap );
////int lwGetPolyVMaps( lwPolygonList *polygon, lwVMap *vmap );

/////* clip.c */

////void lwFreeClip( lwClip *clip );
////lwClip *lwGetClip( idFile *fp, int cksize );
////lwClip *lwFindClip( lwClip *list, int index );

/////* envelope.c */

////void lwFreeEnvelope( lwEnvelope *env );
////lwEnvelope *lwGetEnvelope( idFile *fp, int cksize );
////lwEnvelope *lwFindEnvelope( lwEnvelope *list, int index );
////float lwEvalEnvelope( lwEnvelope *env, /*float*/time:number );

/////* surface.c */

////void lwFreePlugin( lwPlugin *p );
////void lwFreeTexture( lwTexture *t );
////void lwFreeSurface( lwSurface *surf );
////int lwGetTHeader( idFile *fp, int hsz, lwTexture *tex );
////int lwGetTMap( idFile *fp, int tmapsz, lwTMap *tmap );
////int lwGetImageMap( idFile *fp, int rsz, lwTexture *tex );
////int lwGetProcedural( idFile *fp, int rsz, lwTexture *tex );
////int lwGetGradient( idFile *fp, int rsz, lwTexture *tex );
////lwTexture *lwGetTexture( idFile *fp, int bloksz, unsigned int type );
////lwPlugin *lwGetShader( idFile *fp, int bloksz );
////lwSurface *lwGetSurface( idFile *fp, int cksize );
////lwSurface *lwDefaultSurface( void );

/////* lwob.c */

////lwSurface *lwGetSurface5( idFile *fp, int cksize, lwObject *obj );
////int lwGetPolygons5( idFile *fp, int cksize, lwPolygonList *plist, int ptoffset );
////lwObject *lwGetObject5( const char *filename, unsigned int *failID, int *failpos );

/////* list.c */

////void lwListFree( void *list, void ( *freeNode )( void * ));
////void lwListAdd( void **list, void *node );
////void lwListInsert( void **vlist, void *vitem,
////   int ( *compare )( void *, void * ));

/////* vecmath.c */

////float dot( float a[], float b[] );
////void cross( float a[], float b[], float c[] );
////void normalize( float v[] );
////#define vecangle( a, b ) ( float ) idMath::ACos( dot( a, b ) )

/////* lwio.c */

////void  set_flen( int i );
////int   get_flen( void );
////void *getbytes( idFile *fp, int size );
////void  skipbytes( idFile *fp, int n );
////int   getI1( idFile *fp );
////short getI2( idFile *fp );
////int   getI4( idFile *fp );
////unsigned char  getU1( idFile *fp );
////unsigned short getU2( idFile *fp );
////unsigned int   getU4( idFile *fp );
////int   getVX( idFile *fp );
////float getF4( idFile *fp );
////char *getS0( idFile *fp );
////int   sgetI1( unsigned char **bp );
////short sgetI2( unsigned char **bp );
////int   sgetI4( unsigned char **bp );
////unsigned char  sgetU1( unsigned char **bp );
////unsigned short sgetU2( unsigned char **bp );
////unsigned int   sgetU4( unsigned char **bp );
////int   sgetVX( unsigned char **bp );
////float sgetF4( unsigned char **bp );
////char *sgetS0( unsigned char **bp );

////#endif /* !__LWO2_H__ */
