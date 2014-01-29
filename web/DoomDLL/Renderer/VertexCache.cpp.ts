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
//
//#include "../idlib/precompiled.h"
//#pragma hdrstop
//
//#include "tr_local.h"
//
//static const int	FRAME_MEMORY_BYTES = 0x200000;
//static const int	EXPAND_HEADERS = 1024;
//
//idCVar idVertexCache::r_showVertexCache("r_showVertexCache", "0", CVAR_INTEGER|CVAR_RENDERER, "");
//idCVar idVertexCache::r_vertexBufferMegs("r_vertexBufferMegs", "32", CVAR_INTEGER|CVAR_RENDERER, "");
//
var vertexCache:idVertexCache;
//
///*
//==============
//R_ListVertexCache_f
//==============
//*/
//static void R_ListVertexCache_f(const idCmdArgs &args)
//{
//	vertexCache.List();
//}


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
//	int				staticCountTotal;
//	int				staticAllocTotal;		// for end of frame purging
//
//	int				staticAllocThisFrame;	// debug counter
//	int				staticCountThisFrame;
//	int				dynamicAllocThisFrame;
//	int				dynamicCountThisFrame;
//
//	int				currentFrame;			// for purgable block tracking
//	int				listNum;				// currentFrame % NUM_VERTEX_FRAMES, determines which tempBuffers to use
//
//	bool			virtualMemory;			// not fast stuff
//
//	bool			allocatingTempBuffer;	// force GL_STREAM_DRAW_ARB
//
//	vertCache_t		*tempBuffers[NUM_VERTEX_FRAMES];		// allocated at startup
//	bool			tempOverflow;			// had to alloc a temp in static memory
//
//	idBlockAlloc<vertCache_t,1024>	headerAllocator;
//
//	vertCache_t		freeStaticHeaders;		// head of doubly linked list
//	vertCache_t		freeDynamicHeaders;		// head of doubly linked list
//	vertCache_t		dynamicHeaders;			// head of doubly linked list
//	vertCache_t		deferredFreeList;		// head of doubly linked list
//	vertCache_t		staticHeaders;			// head of doubly linked list in MRU order,
//											// staticHeaders.next is most recently used
//
//	int				frameBytes;				// for each of NUM_VERTEX_FRAMES frames

	///*
//==============
//idVertexCache::ActuallyFree
//==============
//*/
//void idVertexCache::ActuallyFree(vertCache_t *block)
//{
//	if (!block) {
//		common->Error("idVertexCache Free: NULL pointer");
//	}
//
//	if (block->user) {
//		// let the owner know we have purged it
//		*block->user = NULL;
//		block->user = NULL;
//	}
//
//	// temp blocks are in a shared space that won't be freed
//	if (block->tag != TAG_TEMP) {
//		staticAllocTotal -= block->size;
//		staticCountTotal--;
//
//		if (block->vbo) {
//#if 0		// this isn't really necessary, it will be reused soon enough
//			// filling with zero length data is the equivalent of freeing
//			glBindBuffer(GL_ARRAY_BUFFER, block->vbo);
//			glBufferData(GL_ARRAY_BUFFER, 0, 0, GL_DYNAMIC_DRAW);
//#endif
//		} else if (block->virtMem) {
//			Mem_Free(block->virtMem);
//			block->virtMem = NULL;
//		}
//	}
//
//	block->tag = TAG_FREE;		// mark as free
//
//	// unlink stick it back on the free list
//	block->next->prev = block->prev;
//	block->prev->next = block->next;
//
//#if 1
//	// stick it on the front of the free list so it will be reused immediately
//	block->next = freeStaticHeaders.next;
//	block->prev = &freeStaticHeaders;
//#else
//	// stick it on the back of the free list so it won't be reused soon (just for debugging)
//	block->next = &freeStaticHeaders;
//	block->prev = freeStaticHeaders.prev;
//#endif
//
//	block->next->prev = block;
//	block->prev->next = block;
//}
//
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
//	if (!buffer || buffer->tag == TAG_FREE) {
//		common->FatalError("idVertexCache::Position: bad vertCache_t");
//	}
//
//	// the vertex object just uses an offset
//	if (buffer->vbo) {
//		if (r_showVertexCache.GetInteger() == 2) {
//			if (buffer->tag == TAG_TEMP) {
//				common->Printf("GL_ARRAY_BUFFER = %i + %i (%i bytes)\n", buffer->vbo, buffer->offset, buffer->size);
//			} else {
//				common->Printf("GL_ARRAY_BUFFER = %i (%i bytes)\n", buffer->vbo, buffer->size);
//			}
//		}
//
//		if (buffer->indexBuffer) {
//			glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer->vbo);
//		} else {
//			glBindBuffer(GL_ARRAY_BUFFER, buffer->vbo);
//		}
//
//		return (void *)buffer->offset;
//	}
//
//	// virtual memory is a real pointer
//	return (void *)((byte *)buffer->virtMem + buffer->offset);
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
	///*
//===========
//idVertexCache::Init
//===========
//*/
//void idVertexCache::Init()
//{
//	cmdSystem->AddCommand("listVertexCache", R_ListVertexCache_f, CMD_FL_RENDERER, "lists vertex cache");
//
//	if (r_vertexBufferMegs.GetInteger() < 8) {
//		r_vertexBufferMegs.SetInteger(8);
//	}
//
//	// initialize the cache memory blocks
//	freeStaticHeaders.next = freeStaticHeaders.prev = &freeStaticHeaders;
//	staticHeaders.next = staticHeaders.prev = &staticHeaders;
//	freeDynamicHeaders.next = freeDynamicHeaders.prev = &freeDynamicHeaders;
//	dynamicHeaders.next = dynamicHeaders.prev = &dynamicHeaders;
//	deferredFreeList.next = deferredFreeList.prev = &deferredFreeList;
//
//	// set up the dynamic frame memory
//	frameBytes = FRAME_MEMORY_BYTES;
//	staticAllocTotal = 0;
//
//	byte	*junk = (byte *)Mem_Alloc(frameBytes);
//
//	for (int i = 0 ; i < NUM_VERTEX_FRAMES ; i++) {
//		allocatingTempBuffer = true;	// force the alloc to use GL_STREAM_DRAW
//		Alloc(junk, frameBytes, &tempBuffers[i]);
//		allocatingTempBuffer = false;
//		tempBuffers[i]->tag = TAG_FIXED;
//		// unlink these from the static list, so they won't ever get purged
//		tempBuffers[i]->next->prev = tempBuffers[i]->prev;
//		tempBuffers[i]->prev->next = tempBuffers[i]->next;
//	}
//
//	Mem_Free(junk);
//
//	EndFrame();
//}
//
	///*
//===========
//idVertexCache::PurgeAll
//
//Used when toggling vertex programs on or off, because
//the cached data isn't valid
//===========
//*/
//void idVertexCache::PurgeAll()
//{
//	while (staticHeaders.next != &staticHeaders) {
//		ActuallyFree(staticHeaders.next);
//	}
//}
//
	///*
//===========
//idVertexCache::Shutdown
//===========
//*/
//void idVertexCache::Shutdown()
//{
////	PurgeAll();	// !@#: also purge the temp buffers
//
//	headerAllocator.Shutdown();
//}
//
	///*
//===========
//idVertexCache::Alloc
//===========
//*/
//void idVertexCache::Alloc(void *data, int size, vertCache_t **buffer, bool indexBuffer)
//{
//	vertCache_t	*block;
//
//	if (size <= 0) {
//		common->Error("idVertexCache::Alloc: size = %i\n", size);
//	}
//
//	// if we can't find anything, it will be NULL
//	*buffer = NULL;
//
//	// if we don't have any remaining unused headers, allocate some more
//	if (freeStaticHeaders.next == &freeStaticHeaders) {
//
//		for (int i = 0; i < EXPAND_HEADERS; i++) {
//			block = headerAllocator.Alloc();
//			block->next = freeStaticHeaders.next;
//			block->prev = &freeStaticHeaders;
//			block->next->prev = block;
//			block->prev->next = block;
//
//			glGenBuffers(1, & block->vbo);
//		}
//	}
//
//	// move it from the freeStaticHeaders list to the staticHeaders list
//	block = freeStaticHeaders.next;
//	block->next->prev = block->prev;
//	block->prev->next = block->next;
//	block->next = staticHeaders.next;
//	block->prev = &staticHeaders;
//	block->next->prev = block;
//	block->prev->next = block;
//
//	block->size = size;
//	block->offset = 0;
//	block->tag = TAG_USED;
//
//	// save data for debugging
//	staticAllocThisFrame += block->size;
//	staticCountThisFrame++;
//	staticCountTotal++;
//	staticAllocTotal += block->size;
//
//	// this will be set to zero when it is purged
//	block->user = buffer;
//	*buffer = block;
//
//	// allocation doesn't imply used-for-drawing, because at level
//	// load time lots of things may be created, but they aren't
//	// referenced by the GPU yet, and can be purged if needed.
//	block->frameUsed = currentFrame - NUM_VERTEX_FRAMES;
//
//	block->indexBuffer = indexBuffer;
//
//	// copy the data
//	if (block->vbo) {
//		if (indexBuffer) {
//			glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, block->vbo);
//			glBufferData(GL_ELEMENT_ARRAY_BUFFER, (GLsizei)size, data, GL_STATIC_DRAW);
//		} else {
//			glBindBuffer(GL_ARRAY_BUFFER, block->vbo);
//
//			if (allocatingTempBuffer) {
//				glBufferData(GL_ARRAY_BUFFER, (GLsizei)size, data, GL_STREAM_DRAW);
//			} else {
//				glBufferData(GL_ARRAY_BUFFER, (GLsizei)size, data, GL_STATIC_DRAW);
//			}
//		}
//	} else {
//		block->virtMem = Mem_Alloc(size);
//		SIMDProcessor->Memcpy(block->virtMem, data, size);
//	}
//}
//
	///*
//===========
//idVertexCache::Touch
//===========
//*/
//void idVertexCache::Touch(vertCache_t *block)
//{
//	if (!block) {
//		common->Error("idVertexCache Touch: NULL pointer");
//	}
//
//	if (block->tag == TAG_FREE) {
//		common->FatalError("idVertexCache Touch: freed pointer");
//	}
//
//	if (block->tag == TAG_TEMP) {
//		common->FatalError("idVertexCache Touch: temporary pointer");
//	}
//
//	block->frameUsed = currentFrame;
//
//	// move to the head of the LRU list
//	block->next->prev = block->prev;
//	block->prev->next = block->next;
//
//	block->next = staticHeaders.next;
//	block->prev = &staticHeaders;
//	staticHeaders.next->prev = block;
//	staticHeaders.next = block;
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
		//	if (block->tag == TAG_FREE) {
		//		common->FatalError("idVertexCache Free: freed pointer");
		//	}
		//
		//	if (block->tag == TAG_TEMP) {
		//		common->FatalError("idVertexCache Free: temporary pointer");
		//	}
		//
		//	// this block still can't be purged until the frame count has expired,
		//	// but it won't need to clear a user pointer when it is
		//	block->user = NULL;
		//
		//	block->next->prev = block->prev;
		//	block->prev->next = block->next;
		//
		//	block->next = deferredFreeList.next;
		//	block->prev = &deferredFreeList;
		//	deferredFreeList.next->prev = block;
		//	deferredFreeList.next = block;
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
//		common->Error("idVertexCache::AllocFrameTemp: size = %i\n", size);
//	}
//
//	if (dynamicAllocThisFrame + size > frameBytes) {
//		// if we don't have enough room in the temp block, allocate a static block,
//		// but immediately free it so it will get freed at the next frame
//		tempOverflow = true;
//		Alloc(data, size, &block);
//		Free(block);
//		return block;
//	}
//
//	// this data is just going on the shared dynamic list
//
//	// if we don't have any remaining unused headers, allocate some more
//	if (freeDynamicHeaders.next == &freeDynamicHeaders) {
//
//		for (int i = 0; i < EXPAND_HEADERS; i++) {
//			block = headerAllocator.Alloc();
//			block->next = freeDynamicHeaders.next;
//			block->prev = &freeDynamicHeaders;
//			block->next->prev = block;
//			block->prev->next = block;
//		}
//	}
//
//	// move it from the freeDynamicHeaders list to the dynamicHeaders list
//	block = freeDynamicHeaders.next;
//	block->next->prev = block->prev;
//	block->prev->next = block->next;
//	block->next = dynamicHeaders.next;
//	block->prev = &dynamicHeaders;
//	block->next->prev = block;
//	block->prev->next = block;
//
//	block->size = size;
//	block->tag = TAG_TEMP;
//	block->indexBuffer = false;
//	block->offset = dynamicAllocThisFrame;
//	dynamicAllocThisFrame += block->size;
//	dynamicCountThisFrame++;
//	block->user = NULL;
//	block->frameUsed = 0;
//
//	// copy the data
//	block->virtMem = tempBuffers[listNum]->virtMem;
//	block->vbo = tempBuffers[listNum]->vbo;
//
//	if (block->vbo) {
//		glBindBuffer(GL_ARRAY_BUFFER, block->vbo);
//		glBufferSubData(GL_ARRAY_BUFFER, block->offset, (GLsizei)size, data);
//	} else {
//		SIMDProcessor->Memcpy((byte *)block->virtMem + block->offset, data, size);
//	}
//
//	return block;
//}
//
///*
//===========
//idVertexCache::EndFrame
//===========
//*/
//void idVertexCache::EndFrame()
//{
//	// display debug information
//	if (r_showVertexCache.GetBool()) {
//		int	staticUseCount = 0;
//		int staticUseSize = 0;
//
//		for (vertCache_t *block = staticHeaders.next ; block != &staticHeaders ; block = block->next) {
//			if (block->frameUsed == currentFrame) {
//				staticUseCount++;
//				staticUseSize += block->size;
//			}
//		}
//
//		const char *frameOverflow = tempOverflow ? "(OVERFLOW)" : "";
//
//		common->Printf("vertex dynamic:%i=%ik%s, static alloc:%i=%ik used:%i=%ik total:%i=%ik\n",
//		               dynamicCountThisFrame, dynamicAllocThisFrame/1024, frameOverflow,
//		               staticCountThisFrame, staticAllocThisFrame/1024,
//		               staticUseCount, staticUseSize/1024,
//		               staticCountTotal, staticAllocTotal/1024);
//	}
//
//#if 0
//
//	// if our total static count is above our working memory limit, start purging things
//	while (staticAllocTotal > r_vertexBufferMegs.GetInteger() * 1024 * 1024) {
//		// free the least recently used
//
//	}
//
//#endif
//
//	// unbind vertex buffers
//	glBindBuffer(GL_ARRAY_BUFFER, 0);
//	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
//
//	currentFrame = tr.frameCount;
//	listNum = currentFrame % NUM_VERTEX_FRAMES;
//	staticAllocThisFrame = 0;
//	staticCountThisFrame = 0;
//	dynamicAllocThisFrame = 0;
//	dynamicCountThisFrame = 0;
//	tempOverflow = false;
//
//	// free all the deferred free headers
//	while (deferredFreeList.next != &deferredFreeList) {
//		ActuallyFree(deferredFreeList.next);
//	}
//
//	// free all the frame temp headers
//	vertCache_t	*block = dynamicHeaders.next;
//
//	if (block != &dynamicHeaders) {
//		block->prev = &freeDynamicHeaders;
//		dynamicHeaders.prev->next = freeDynamicHeaders.next;
//		freeDynamicHeaders.next->prev = dynamicHeaders.prev;
//		freeDynamicHeaders.next = block;
//
//		dynamicHeaders.next = dynamicHeaders.prev = &dynamicHeaders;
//	}
//}
//
///*
//=============
//idVertexCache::List
//=============
//*/
//void idVertexCache::List(void)
//{
//	int	numActive = 0;
//	int	numDeferred = 0;
//	int frameStatic = 0;
//	int	totalStatic = 0;
//	int	deferredSpace = 0;
//
//	vertCache_t *block;
//
//	for (block = staticHeaders.next ; block != &staticHeaders ; block = block->next) {
//		numActive++;
//
//		totalStatic += block->size;
//
//		if (block->frameUsed == currentFrame) {
//			frameStatic += block->size;
//		}
//	}
//
//	int	numFreeStaticHeaders = 0;
//
//	for (block = freeStaticHeaders.next ; block != &freeStaticHeaders ; block = block->next) {
//		numFreeStaticHeaders++;
//	}
//
//	int	numFreeDynamicHeaders = 0;
//
//	for (block = freeDynamicHeaders.next ; block != &freeDynamicHeaders ; block = block->next) {
//		numFreeDynamicHeaders++;
//	}
//
//	common->Printf("%i megs working set\n", r_vertexBufferMegs.GetInteger());
//	common->Printf("%i dynamic temp buffers of %ik\n", NUM_VERTEX_FRAMES, frameBytes / 1024);
//	common->Printf("%5i active static headers\n", numActive);
//	common->Printf("%5i free static headers\n", numFreeStaticHeaders);
//	common->Printf("%5i free dynamic headers\n", numFreeDynamicHeaders);
//}
}