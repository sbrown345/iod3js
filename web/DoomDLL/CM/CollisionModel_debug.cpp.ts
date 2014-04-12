/////*
////===========================================================================
////
////Doom 3 GPL Source Code
////Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 
////
////This file is part of the Doom 3 GPL Source Code (?Doom 3 Source Code?).  
////
////Doom 3 Source Code is free software: you can redistribute it and/or modify
////it under the terms of the GNU General Public License as published by
////the Free Software Foundation, either version 3 of the License, or
////(at your option) any later version.
////
////Doom 3 Source Code is distributed in the hope that it will be useful,
////but WITHOUT ANY WARRANTY; without even the implied warranty of
////MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
////GNU General Public License for more details.
////
////You should have received a copy of the GNU General Public License
////along with Doom 3 Source Code.  If not, see <http://www.gnu.org/licenses/>.
////
////In addition, the Doom 3 Source Code is also subject to certain additional terms. You should have received a copy of these additional terms immediately following the terms and conditions of the GNU General Public License which accompanied the Doom 3 Source Code.  If not, please request a copy in writing from id Software at the address below.
////
////If you have questions concerning this license or the applicable additional terms, you may contact in writing id Software LLC, c/o ZeniMax Media Inc., Suite 120, Rockville, Maryland 20850 USA.
////
////===========================================================================
////*/
////
/////*
////===============================================================================
////
////	Trace model vs. polygonal model collision detection.
////
////===============================================================================
////*/
////
////#include "../idlib/precompiled.h"
////#pragma hdrstop
////
////#include "CollisionModel_local.h"
////
////
/*
===============================================================================

Visualisation code

===============================================================================
*/

var cm_contentsNameByIndex = [
	"none",							// 0
	"solid",						// 1
	"opaque",						// 2
	"water",						// 3
	"playerclip",					// 4
	"monsterclip",					// 5
	"moveableclip",					// 6
	"ikclip",						// 7
	"blood",						// 8
	"body",							// 9
	"corpse",						// 10
	"trigger",						// 11
	"aas_solid",					// 12
	"aas_obstacle",					// 13
	"flashlight_trigger",			// 14
	//NULL
];

var/*int */cm_contentsFlagByIndex = [
	-1,								// 0
	contentsFlags_t.CONTENTS_SOLID,					// 1
	contentsFlags_t.CONTENTS_OPAQUE,				// 2
	contentsFlags_t.CONTENTS_WATER,					// 3
	contentsFlags_t.CONTENTS_PLAYERCLIP,			// 4
	contentsFlags_t.CONTENTS_MONSTERCLIP,			// 5
	contentsFlags_t.CONTENTS_MOVEABLECLIP,			// 6
	contentsFlags_t.CONTENTS_IKCLIP,				// 7
	contentsFlags_t.CONTENTS_BLOOD,					// 8
	contentsFlags_t.CONTENTS_BODY,					// 9
	contentsFlags_t.CONTENTS_CORPSE,				// 10
	contentsFlags_t.CONTENTS_TRIGGER,				// 11
	contentsFlags_t.CONTENTS_AAS_SOLID,				// 12
	contentsFlags_t.CONTENTS_AAS_OBSTACLE,			// 13
	contentsFlags_t.CONTENTS_FLASHLIGHT_TRIGGER,	// 14
	0
];

var cm_drawMask = new idCVar ( 			"cm_drawMask",			"none",		CVAR_GAME,				"collision mask", cm_contentsNameByIndex, ArgCompletion_String_Template(cm_contentsNameByIndex) );
var cm_drawColor = new idCVar ( 		"cm_drawColor",			"1 0 0 .5",	CVAR_GAME,				"color used to draw the collision models" );
var cm_drawFilled = new idCVar ( 		"cm_drawFilled",		"0",		CVAR_GAME | CVAR_BOOL,	"draw filled polygons" );
var cm_drawInternal = new idCVar ( 		"cm_drawInternal",		"1",		CVAR_GAME | CVAR_BOOL,	"draw internal edges green" );
var cm_drawNormals = new idCVar ( 		"cm_drawNormals",		"0",		CVAR_GAME | CVAR_BOOL,	"draw polygon and edge normals" );
var cm_backFaceCull = new idCVar ( 		"cm_backFaceCull",		"0",		CVAR_GAME | CVAR_BOOL,	"cull back facing polygons" );
var cm_debugCollision = new idCVar ( 	"cm_debugCollision",	"0",		CVAR_GAME | CVAR_BOOL,	"debug the collision detection" );

//static idVec4 cm_color;

/*
===============================================================================

Speed test code

===============================================================================
*/

var cm_testCollision = new idCVar (		"cm_testCollision",		"0",					CVAR_GAME | CVAR_BOOL,		"" );
var cm_testRotation = new idCVar (		"cm_testRotation",		"1",					CVAR_GAME | CVAR_BOOL,		"" );
var cm_testModel = new idCVar (			"cm_testModel",			"0",					CVAR_GAME | CVAR_INTEGER,	"" );
var cm_testTimes = new idCVar (			"cm_testTimes",			"1000",					CVAR_GAME | CVAR_INTEGER,	"" );
var cm_testRandomMany = new idCVar (	"cm_testRandomMany",	"0",					CVAR_GAME | CVAR_BOOL,		"" );
var cm_testOrigin = new idCVar (		"cm_testOrigin",		"0 0 0",				CVAR_GAME,					"" );
var cm_testReset = new idCVar (			"cm_testReset",			"0",					CVAR_GAME | CVAR_BOOL,		"" );
var cm_testBox = new idCVar (			"cm_testBox",			"-16 -16 0 16 16 64",	CVAR_GAME,					"" );
var cm_testBoxRotation = new idCVar (	"cm_testBoxRotation",	"0 0 0",				CVAR_GAME,					"" );
var cm_testWalk = new idCVar (			"cm_testWalk",			"1",					CVAR_GAME | CVAR_BOOL,		"" );
var cm_testLength = new idCVar (		"cm_testLength",		"1024",					CVAR_GAME | CVAR_FLOAT,		"" );
var cm_testRadius = new idCVar (		"cm_testRadius",		"64",					CVAR_GAME | CVAR_FLOAT,		"" );
var cm_testAngle = new idCVar (			"cm_testAngle",			"60",					CVAR_GAME | CVAR_FLOAT,		"" );

////static int total_translation;
////static int min_translation = 999999;
////static int max_translation = -999999;
////static int num_translation = 0;
////static int total_rotation;
////static int min_rotation = 999999;
////static int max_rotation = -999999;
////static int num_rotation = 0;
////static idVec3 start;
////static idVec3 *testend;
////
////#include "../sys/sys_public.h"
////
////void idCollisionModelManagerLocal::DebugOutput( const idVec3 &origin ) {
////	int i, k, t;
////	char buf[128];
////	idVec3 end;
////	idAngles boxAngles;
////	idMat3 modelAxis, boxAxis;
////	idBounds bounds;
////	trace_t trace;
////
////	if ( !cm_testCollision.GetBool() ) {
////		return;
////	}
////
////	testend = (idVec3 *) Mem_Alloc( cm_testTimes.GetInteger() * sizeof(idVec3) );
////
////	if ( cm_testReset.GetBool() || ( cm_testWalk.GetBool() && !start.Compare( start ) ) ) {
////		total_translation = total_rotation = 0;
////		min_translation = min_rotation = 999999;
////		max_translation = max_rotation = -999999;
////		num_translation = num_rotation = 0;
////		cm_testReset.SetBool( false );
////	}
////
////	if ( cm_testWalk.GetBool() ) {
////		start = origin;
////		cm_testOrigin.SetString( va( "%1.2f %1.2f %1.2f", start[0], start[1], start[2] ) );
////	} else {
////		sscanf( cm_testOrigin.GetString(), "%f %f %f", &start[0], &start[1], &start[2] );
////	}
////
////	sscanf( cm_testBox.GetString(), "%f %f %f %f %f %f", &bounds[0][0], &bounds[0][1], &bounds[0][2],
////										&bounds[1][0], &bounds[1][1], &bounds[1][2] );
////	sscanf( cm_testBoxRotation.GetString(), "%f %f %f", &boxAngles[0], &boxAngles[1], &boxAngles[2] );
////	boxAxis = boxAngles.ToMat3();
////	modelAxis.Identity();
////
////	idTraceModel itm( bounds );
////	idRandom random( 0 );
////	idTimer timer;
////
////	if ( cm_testRandomMany.GetBool() ) {
////		// if many traces in one random direction
////		for ( i = 0; i < 3; i++ ) {
////			testend[0][i] = start[i] + random.CRandomFloat() * cm_testLength.GetFloat();
////		}
////		for ( k = 1; k < cm_testTimes.GetInteger(); k++ ) {
////			testend[k] = testend[0];
////		}
////	} else {
////		// many traces each in a different random direction
////		for ( k = 0; k < cm_testTimes.GetInteger(); k++ ) {
////			for ( i = 0; i < 3; i++ ) {
////				testend[k][i] = start[i] + random.CRandomFloat() * cm_testLength.GetFloat();
////			}
////		}
////	}
////
////	// translational collision detection
////	timer.Clear();
////	timer.Start();
////	for ( i = 0; i < cm_testTimes.GetInteger(); i++ ) {
////		Translation( &trace, start, testend[i], &itm, boxAxis, CONTENTS_SOLID|CONTENTS_PLAYERCLIP, cm_testModel.GetInteger(), vec3_origin, modelAxis );
////	}
////	timer.Stop();
////	t = timer.Milliseconds();
////	if ( t < min_translation ) min_translation = t;
////	if ( t > max_translation ) max_translation = t;
////	num_translation++;
////	total_translation += t;
////	if ( cm_testTimes.GetInteger() > 9999 ) {
////		sprintf( buf, "%3dK", (int ) ( cm_testTimes.GetInteger() / 1000 ) );
////	} else {
////		sprintf( buf, "%4d", cm_testTimes.GetInteger() );
////	}
////	common->Printf("%s translations: %4d milliseconds, (min = %d, max = %d, av = %1.1f)\n", buf, t, min_translation, max_translation, (float) total_translation / num_translation );
////
////	if ( cm_testRandomMany.GetBool() ) {
////		// if many traces in one random direction
////		for ( i = 0; i < 3; i++ ) {
////			testend[0][i] = start[i] + random.CRandomFloat() * cm_testRadius.GetFloat();
////		}
////		for ( k = 1; k < cm_testTimes.GetInteger(); k++ ) {
////			testend[k] = testend[0];
////		}
////	} else {
////		// many traces each in a different random direction
////		for ( k = 0; k < cm_testTimes.GetInteger(); k++ ) {
////			for ( i = 0; i < 3; i++ ) {
////				testend[k][i] = start[i] + random.CRandomFloat() * cm_testRadius.GetFloat();
////			}
////		}
////	}
////
////	if ( cm_testRotation.GetBool() ) {
////		// rotational collision detection
////		idVec3 vec( random.CRandomFloat(), random.CRandomFloat(), random.RandomFloat() );
////		vec.Normalize();
////		idRotation rotation( vec3_origin, vec, cm_testAngle.GetFloat() );
////
////		timer.Clear();
////		timer.Start();
////		for ( i = 0; i < cm_testTimes.GetInteger(); i++ ) {
////			rotation.SetOrigin( testend[i] );
////			Rotation( &trace, start, rotation, &itm, boxAxis, CONTENTS_SOLID|CONTENTS_PLAYERCLIP, cm_testModel.GetInteger(), vec3_origin, modelAxis );
////		}
////		timer.Stop();
////		t = timer.Milliseconds();
////		if ( t < min_rotation ) min_rotation = t;
////		if ( t > max_rotation ) max_rotation = t;
////		num_rotation++;
////		total_rotation += t;
////		if ( cm_testTimes.GetInteger() > 9999 ) {
////			sprintf( buf, "%3dK", (int ) ( cm_testTimes.GetInteger() / 1000 ) );
////		} else {
////			sprintf( buf, "%4d", cm_testTimes.GetInteger() );
////		}
////		common->Printf("%s rotation: %4d milliseconds, (min = %d, max = %d, av = %1.1f)\n", buf, t, min_rotation, max_rotation, (float) total_rotation / num_rotation );
////	}
////
////	Mem_Free( testend );
////	testend = NULL;
////}
