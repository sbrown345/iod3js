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
//
// vertex cache calls should only be made by the front end

var NUM_VERTEX_FRAMES = 2;

enum vertBlockTag_t{
	TAG_FREE,
	TAG_USED,
	TAG_FIXED,		// for the temp buffers
	TAG_TEMP		// in frame temp area, not static area
};

class vertCache_t {
//	GLuint			vbo;
//	void			*virtMem;			// only one of vbo / virtMem will be set
//	bool			indexBuffer;		// holds indexes instead of vertexes
//
//	intptr_t		offset;
//	int				size;				// may be larger than the amount asked for, due
//										// to round up and minimum fragment sizes
//	int				tag;				// a tag of 0 is a free block
//	struct vertCache_s	**	user;				// will be set to zero when purged
//	struct vertCache_s *next, *prev;	// may be on the static list or one of the frame lists
//	int				frameUsed;			// it can't be purged if near the current frame
} vertCache_t;