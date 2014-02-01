///*
//===========================================================================
//
//Doom 3 GPL Source Code
//Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company.
//
//This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).
//
//Doom 3 Source Code is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//Doom 3 Source Code is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.
//
//In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.
//
//If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.
//
//===========================================================================
//*/

//#include "../idlib/precompiled.h"
//#pragma hdrstop

//#include "tr_local.h"

var	FRAME_MEMORY_BYTES = 0x200000;
var	EXPAND_HEADERS = 1024;

var r_showVertexCache = new idCVar( "r_showVertexCache", "0", CVAR_INTEGER | CVAR_RENDERER, "" );
var r_vertexBufferMegs = new idCVar( "r_vertexBufferMegs", "32", CVAR_INTEGER | CVAR_RENDERER, "" );


/*
==============
R_ListVertexCache_f
==============
*/
function R_ListVertexCache_f ( args: idCmdArgs ): void {
	vertexCache.List ( );
}


class idVertexCache {
//public:
//	void			Init();
//	void			Shutdown();
//
//	// called when vertex programs are enabled or disabled, because
//	// the cached data is no longer valid
//	void			PurgeAll();
//
//	// Tries to allocate space for the given data in fast vertex
//	// memory, and copies it over.
//	// Alloc does NOT do a touch, which allows purging of things
//	// created at level load time even if a frame hasn't passed yet.
//	// These allocations can be purged, which will zero the pointer.
//	void			Alloc( void *data, int bytes, vertCache_t **buffer, bool indexBuffer = false );
//
//	// This will be a real pointer with virtual memory,
//	// but it will be an int offset cast to a pointer of ARB_vertex_buffer_object
//	void *			Position( vertCache_t *buffer );
//
//	// if r_useIndexBuffers is enabled, but you need to draw something without
//	// an indexCache, this must be called to reset GL_ELEMENT_ARRAY_BUFFER
//	void			UnbindIndex();
//
//	// automatically freed at the end of the next frame
//	// used for specular texture coordinates and gui drawing, which
//	// will change every frame.
//	// will return NULL if the vertex cache is completely full
//	// As with Position(), this may not actually be a pointer you can access.
//	vertCache_t	*	AllocFrameTemp( void *data, int bytes );
//
//	// notes that a buffer is used this frame, so it can't be purged
//	// out from under the GPU
//	void			Touch( vertCache_t *buffer );
//
//	// this block won't have to zero a buffer pointer when it is purged,
//	// but it must still wait for the frames to pass, in case the GPU
//	// is still referencing it
//	void			Free( vertCache_t *buffer );	
//
//	// updates the counter for determining which temp space to use
//	// and which blocks can be purged
//	// Also prints debugging info when enabled
//	void			EndFrame();
//
//	// listVertexCache calls this
//	void			List();
//
//private:
//	void			InitMemoryBlocks( int size );
//	void			ActuallyFree( vertCache_t *block );
//
//	static idCVar	r_showVertexCache;
//	static idCVar	r_vertexBufferMegs;
//
	staticCountTotal = 0;											   //	int				
	staticAllocTotal = 0;		// for end of frame purging			   //	int				

	staticAllocThisFrame = 0;	// debug counter		 //	int				
	staticCountThisFrame = 0;							 //	int				
	dynamicAllocThisFrame = 0;							 //	int				
	dynamicCountThisFrame = 0;							 //	int				

	currentFrame = 0;			// for purgable block tracking												//	int				
	listNum = 0;				// currentFrame % NUM_VERTEX_FRAMES, determines which tempBuffers to use	//	int				

	virtualMemory:boolean;			// not fast stuff

	allocatingTempBuffer:boolean;	// force GL_STREAM_DRAW_ARB
//
	tempBuffers = newStructArray<vertCache_t>(vertCache_t, NUM_VERTEX_FRAMES);		// allocated at startup
	tempOverflow:boolean;			// had to alloc a temp in static memory

	headerAllocator = idBlockAlloc_template<vertCache_t>(vertCache_t, 1024);

	freeStaticHeaders = new vertCache_t;		// head of doubly linked list
	freeDynamicHeaders = new vertCache_t;		// head of doubly linked list
	dynamicHeaders = new vertCache_t;			// head of doubly linked list
	deferredFreeList = new vertCache_t;		// head of doubly linked list
	staticHeaders = new vertCache_t;			// head of doubly linked list in MRU order,
//											// staticHeaders.next is most recently used

	frameBytes = 0;				// for each of NUM_VERTEX_FRAMES frames//	int				

	/*
==============
idVertexCache::ActuallyFree
==============
*/
	ActuallyFree(block: vertCache_t ):void
{
	if (!block) {
		common.Error("idVertexCache Free: NULL pointer");
	}

	if (block.user) {
		// let the owner know we have purged it
		block.user = null;
	}

	// temp blocks are in a shared space that won't be freed
	if (block.tag != vertBlockTag_t.TAG_TEMP) {
		this.staticAllocTotal -= block.size;
		this.staticCountTotal--;

		if (block.vbo) {
//#if 0		// this isn't really necessary, it will be reused soon enough
//			// filling with zero length data is the equivalent of freeing
//			glBindBuffer(GL_ARRAY_BUFFER, block.vbo);
//			glBufferData(GL_ARRAY_BUFFER, 0, 0, GL_DYNAMIC_DRAW);
//#endif
		} else if (block.virtMem) {
			Mem_Free(block.virtMem);
			block.virtMem = null;
		}
	}

	block.tag = vertBlockTag_t.TAG_FREE;		// mark as free

	// unlink stick it back on the free list
	block.next.prev = block.prev;
	block.prev.next = block.next;

//#if 1
	// stick it on the front of the free list so it will be reused immediately
	block.next = this.freeStaticHeaders.next;
	block.prev = this.freeStaticHeaders;
//#else
//	// stick it on the back of the free list so it won't be reused soon (just for debugging)
//	block.next = &this.freeStaticHeaders;
//	block.prev = this.freeStaticHeaders.prev;
//#endif

	block.next.prev = block;
	block.prev.next = block;
}

	///*
//==============
//idVertexCache::Position
//
//this will be a real pointer with virtual memory,
//but it will be an int offset cast to a pointer with
//vertex buffer object
//
//The vertex buffer object will be bound
//==============
//*/
//void *idVertexCache::Position(vertCache_t *buffer)
//{
//	if (!buffer || buffer.tag == TAG_FREE) {
//		common.FatalError("idVertexCache::Position: bad vertCache_t");
//	}
//
//	// the vertex object just uses an offset
//	if (buffer.vbo) {
//		if (r_showVertexCache.GetInteger() == 2) {
//			if (buffer.tag == TAG_TEMP) {
//				common.Printf("GL_ARRAY_BUFFER = %i + %i (%i bytes)\n", buffer.vbo, buffer.offset, buffer.size);
//			} else {
//				common.Printf("GL_ARRAY_BUFFER = %i (%i bytes)\n", buffer.vbo, buffer.size);
//			}
//		}
//
//		if (buffer.indexBuffer) {
//			glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer.vbo);
//		} else {
//			glBindBuffer(GL_ARRAY_BUFFER, buffer.vbo);
//		}
//
//		return (void *)buffer.offset;
//	}
//
//	// virtual memory is a real pointer
//	return (void *)((byte *)buffer.virtMem + buffer.offset);
//}
//
//void idVertexCache::UnbindIndex()
//{
//	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
//}
//
//
////================================================================================
//
/*
===========
idVertexCache::Init
===========
*/

	Init ( ): void {
		cmdSystem.AddCommand( "listVertexCache", R_ListVertexCache_f, CMD_FL_RENDERER, "lists vertex cache" );
		
		if (r_vertexBufferMegs.GetInteger() < 8) {
			r_vertexBufferMegs.SetInteger(8);
		}

		// initialize the cache memory blocks
		this.freeStaticHeaders.next = this.freeStaticHeaders.prev = this.freeStaticHeaders;
		this.staticHeaders.next = this.staticHeaders.prev = this.staticHeaders;
		this.freeDynamicHeaders.next = this.freeDynamicHeaders.prev = this.freeDynamicHeaders;
		this.dynamicHeaders.next = this.dynamicHeaders.prev = this.dynamicHeaders;
		this.deferredFreeList.next = this.deferredFreeList.prev = this.deferredFreeList;

		// set up the dynamic frame memory
		this.frameBytes = FRAME_MEMORY_BYTES;
		this.staticAllocTotal = 0;

		var junk = new Uint8Array( this.frameBytes );//byte	*junk = (byte *)Mem_Alloc(this.frameBytes);

		var $tempBuffer = new R<vertCache_t> ( );
		for (var i = 0 ; i < NUM_VERTEX_FRAMES ; i++) {
			this.allocatingTempBuffer = true;	// force the alloc to use GL_STREAM_DRAW

			$tempBuffer.$ = this.tempBuffers[i];
			this.Alloc(junk, this.frameBytes, $tempBuffer);
			this.tempBuffers[i] = $tempBuffer.$;

			this.allocatingTempBuffer = false;
			this.tempBuffers[i].tag = vertBlockTag_t.TAG_FIXED;
			// unlink these from the static list, so they won't ever get purged
			this.tempBuffers[i].next.prev = this.tempBuffers[i].prev;
			this.tempBuffers[i].prev.next = this.tempBuffers[i].next;
		}

		Mem_Free(junk);

		this.EndFrame();
	}

/*
===========
idVertexCache::PurgeAll

Used when toggling vertex programs on or off, because
the cached data isn't valid
===========
*/
	PurgeAll ( ): void {
		while ( this.staticHeaders.next != this.staticHeaders ) {
			this.ActuallyFree( this.staticHeaders.next );
		}
	}

	///*
//===========
//idVertexCache::Shutdown
//===========
//*/
//void idVertexCache::Shutdown()
//{
////	PurgeAll();	// !@#: also purge the temp buffers
//
//	this.headerAllocator.Shutdown();
//}
//
	/*
===========
idVertexCache::Alloc
===========
*/
Alloc(/*void **/data:Uint8Array, /*int */size:number, /*vertCache_t ***/buffer:R<vertCache_t>, indexBuffer = false):void
{
	var block: vertCache_t;

	if (size <= 0) {
		common.Error("idVertexCache::Alloc: size = %i\n", size);
	}

	// if we can't find anything, it will be NULL
	buffer.$ = null;

	// if we don't have any remaining unused headers, allocate some more
	if (this.freeStaticHeaders.next == this.freeStaticHeaders) {

		for (var i = 0; i < EXPAND_HEADERS; i++) {
			block = this.headerAllocator.Alloc();
			block.next = this.freeStaticHeaders.next;
			block.prev = this.freeStaticHeaders;
			block.next.prev = block;
			block.prev.next = block;

			block.vbo = glGenBuffers(1);
		}
	}

	// move it from the freeStaticHeaders list to the staticHeaders list
	block = this.freeStaticHeaders.next;
	block.next.prev = block.prev;
	block.prev.next = block.next;
	block.next = this.staticHeaders.next;
	block.prev = this.staticHeaders;
	block.next.prev = block;
	block.prev.next = block;

	block.size = size;
	block.offset = 0;
	block.tag = vertBlockTag_t.TAG_USED;

	// save data for debugging
	this.staticAllocThisFrame += block.size;
	this.staticCountThisFrame++;
	this.staticCountTotal++;
	this.staticAllocTotal += block.size;

	// this will be set to zero when it is purged
	block.user = buffer.$;
	buffer.$ = block;

	// allocation doesn't imply used-for-drawing, because at level
	// load time lots of things may be created, but they aren't
	// referenced by the GPU yet, and can be purged if needed.
	block.frameUsed = this.currentFrame - NUM_VERTEX_FRAMES;

	block.indexBuffer = indexBuffer;

	// copy the data
	if (block.vbo) {
		if (indexBuffer) {
			glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, block.vbo);
			glBufferData(GL_ELEMENT_ARRAY_BUFFER, /*(GLsizei)*/size, data, GL_STATIC_DRAW);
		} else {
			glBindBuffer(GL_ARRAY_BUFFER, block.vbo);

			if (this.allocatingTempBuffer) {
				glBufferData(GL_ARRAY_BUFFER, /*(GLsizei)*/size, data, GL_STREAM_DRAW);
			} else {
				glBufferData(GL_ARRAY_BUFFER, /*(GLsizei)*/size, data, GL_STATIC_DRAW);
			}
		}
	} else {
		todoThrow ( );
		block.virtMem = new Uint8Array(Mem_Alloc(size));
		SIMDProcessor.Memcpy(block.virtMem, data, size);
	}
}
//
	///*
//===========
//idVertexCache::Touch
//===========
//*/
//void idVertexCache::Touch(vertCache_t *block)
//{
//	if (!block) {
//		common.Error("idVertexCache Touch: NULL pointer");
//	}
//
//	if (block.tag == TAG_FREE) {
//		common.FatalError("idVertexCache Touch: freed pointer");
//	}
//
//	if (block.tag == TAG_TEMP) {
//		common.FatalError("idVertexCache Touch: temporary pointer");
//	}
//
//	block.frameUsed = this.currentFrame;
//
//	// move to the head of the LRU list
//	block.next.prev = block.prev;
//	block.prev.next = block.next;
//
//	block.next = this.staticHeaders.next;
//	block.prev = &this.staticHeaders;
//	this.staticHeaders.next.prev = block;
//	this.staticHeaders.next = block;
//}

/*
===========
idVertexCache::Free
===========
*/
	Free ( block: vertCache_t ): void {
		if ( !block ) {
			return;
		}
		todoThrow ( );
		//	if (block.tag == TAG_FREE) {
		//		common.FatalError("idVertexCache Free: freed pointer");
		//	}
		//
		//	if (block.tag == TAG_TEMP) {
		//		common.FatalError("idVertexCache Free: temporary pointer");
		//	}
		//
		//	// this block still can't be purged until the frame count has expired,
		//	// but it won't need to clear a user pointer when it is
		//	block.user = NULL;
		//
		//	block.next.prev = block.prev;
		//	block.prev.next = block.next;
		//
		//	block.next = this.deferredFreeList.next;
		//	block.prev = &this.deferredFreeList;
		//	this.deferredFreeList.next.prev = block;
		//	this.deferredFreeList.next = block;
	}
//
///*
//===========
//idVertexCache::AllocFrameTemp
//
//A frame temp allocation must never be allowed to fail due to overflow.
//We can't simply sync with the GPU and overwrite what we have, because
//there may still be future references to dynamically created surfaces.
//===========
//*/
//vertCache_t	*idVertexCache::AllocFrameTemp(void *data, int size)
//{
//	vertCache_t	*block;
//
//	if (size <= 0) {
//		common.Error("idVertexCache::AllocFrameTemp: size = %i\n", size);
//	}
//
//	if (this.dynamicAllocThisFrame + size > this.frameBytes) {
//		// if we don't have enough room in the temp block, allocate a static block,
//		// but immediately free it so it will get freed at the next frame
//		this.tempOverflow = true;
//		Alloc(data, size, &block);
//		Free(block);
//		return block;
//	}
//
//	// this data is just going on the shared dynamic list
//
//	// if we don't have any remaining unused headers, allocate some more
//	if (this.freeDynamicHeaders.next == &this.freeDynamicHeaders) {
//
//		for (int i = 0; i < EXPAND_HEADERS; i++) {
//			block = this.headerAllocator.Alloc();
//			block.next = this.freeDynamicHeaders.next;
//			block.prev = &this.freeDynamicHeaders;
//			block.next.prev = block;
//			block.prev.next = block;
//		}
//	}
//
//	// move it from the freeDynamicHeaders list to the dynamicHeaders list
//	block = this.freeDynamicHeaders.next;
//	block.next.prev = block.prev;
//	block.prev.next = block.next;
//	block.next = this.dynamicHeaders.next;
//	block.prev = &this.dynamicHeaders;
//	block.next.prev = block;
//	block.prev.next = block;
//
//	block.size = size;
//	block.tag = TAG_TEMP;
//	block.indexBuffer = false;
//	block.offset = this.dynamicAllocThisFrame;
//	this.dynamicAllocThisFrame += block.size;
//	this.dynamicCountThisFrame++;
//	block.user = NULL;
//	block.frameUsed = 0;
//
//	// copy the data
//	block.virtMem = this.tempBuffers[this.listNum].virtMem;
//	block.vbo = this.tempBuffers[this.listNum].vbo;
//
//	if (block.vbo) {
//		glBindBuffer(GL_ARRAY_BUFFER, block.vbo);
//		glBufferSubData(GL_ARRAY_BUFFER, block.offset, (GLsizei)size, data);
//	} else {
//		SIMDProcessor.Memcpy((byte *)block.virtMem + block.offset, data, size);
//	}
//
//	return block;
//}
//
/*
===========
idVertexCache::EndFrame
===========
*/
	EndFrame ( ): void {
		// display debug information
		if ( r_showVertexCache.GetBool ( ) ) {
			var /*int	*/staticUseCount = 0;
			var /*int */staticUseSize = 0;

			for ( var block = this.staticHeaders.next; block != this.staticHeaders; block = block.next ) {
				if ( block.frameUsed == this.currentFrame ) {
					staticUseCount++;
					staticUseSize += block.size;
				}
			}

			var frameOverflow = this.tempOverflow ? "(OVERFLOW)" : "";

			common.Printf( "vertex dynamic:%i=%ik%s, static alloc:%i=%ik used:%i=%ik total:%i=%ik\n",
				this.dynamicCountThisFrame, this.dynamicAllocThisFrame / 1024, frameOverflow,
				this.staticCountThisFrame, this.staticAllocThisFrame / 1024,
				staticUseCount, staticUseSize / 1024,
				this.staticCountTotal, this.staticAllocTotal / 1024 );
		}

//#if 0

//	// if our total static count is above our working memory limit, start purging things
//	while (this.staticAllocTotal > r_vertexBufferMegs.GetInteger() * 1024 * 1024) {
//		// free the least recently used

//	}

//#endif

		// unbind vertex buffers
		glBindBuffer( GL_ARRAY_BUFFER, null );
		glBindBuffer( GL_ELEMENT_ARRAY_BUFFER, null );

		this.currentFrame = tr.frameCount;
		this.listNum = this.currentFrame % NUM_VERTEX_FRAMES;
		this.staticAllocThisFrame = 0;
		this.staticCountThisFrame = 0;
		this.dynamicAllocThisFrame = 0;
		this.dynamicCountThisFrame = 0;
		this.tempOverflow = false;

		// free all the deferred free headers
		while ( this.deferredFreeList.next != this.deferredFreeList ) {
			this.ActuallyFree( this.deferredFreeList.next );
		}

		// free all the frame temp headers
		var block = this.dynamicHeaders.next;

		if ( block != this.dynamicHeaders ) {
			block.prev = this.freeDynamicHeaders;
			this.dynamicHeaders.prev.next = this.freeDynamicHeaders.next;
			this.freeDynamicHeaders.next.prev = this.dynamicHeaders.prev;
			this.freeDynamicHeaders.next = block;

			this.dynamicHeaders.next = this.dynamicHeaders.prev = this.dynamicHeaders;
		}
	}

/*
=============
idVertexCache::List
=============
*/
	List ( ): void {
		todoThrow ( );
		//int	numActive = 0;
		//int	numDeferred = 0;
		//int frameStatic = 0;
		//int	totalStatic = 0;
		//int	deferredSpace = 0;

		//vertCache_t *block;

		//for (block = this.staticHeaders.next ; block != &this.staticHeaders ; block = block.next) {
		//	numActive++;

		//	totalStatic += block.size;

		//	if (block.frameUsed == this.currentFrame) {
		//		frameStatic += block.size;
		//	}
		//}

		//int	numFreeStaticHeaders = 0;

		//for (block = this.freeStaticHeaders.next ; block != &this.freeStaticHeaders ; block = block.next) {
		//	numFreeStaticHeaders++;
		//}

		//int	numFreeDynamicHeaders = 0;

		//for (block = this.freeDynamicHeaders.next ; block != &this.freeDynamicHeaders ; block = block.next) {
		//	numFreeDynamicHeaders++;
		//}

		//common.Printf("%i megs working set\n", r_vertexBufferMegs.GetInteger());
		//common.Printf("%i dynamic temp buffers of %ik\n", NUM_VERTEX_FRAMES, this.frameBytes / 1024);
		//common.Printf("%5i active static headers\n", numActive);
		//common.Printf("%5i free static headers\n", numFreeStaticHeaders);
		//common.Printf("%5i free dynamic headers\n", numFreeDynamicHeaders);
	}
}

var vertexCache = new idVertexCache;
