Revision: 860782eb7e0667ccad6b029bad596d379834785c
Author: Oliver McFadden <omcfadde@gmail.com>
Date: 24/04/2012 13:07:51
Message:
es2: initial OpenGL ES2.0 renderer support.





THIS FILE NEXT


/*
===========================================================================

Doom 3 GPL Source Code
Copyright (C) 1999-2011 id Software LLC, a ZeniMax Media company. 

This file is part of the Doom 3 GPL Source Code ("Doom 3 Source Code").  

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

#include "../idlib/precompiled.h"
#pragma hdrstop

#include "tr_local.h"

shaderProgram_t		interactionShader = {-1};
shaderProgram_t		ambientInteractionShader = {-1};
shaderProgram_t		stencilShadowShader = {-1};

shaderProgram_t		defaultShader;
shaderProgram_t		depthFillShader;

/*
=========================================================================================

GENERAL INTERACTION RENDERING

=========================================================================================
*/

/*
====================
GL_SelectTextureNoClient
====================
*/
static void GL_SelectTextureNoClient( int unit ) {
	backEnd.glState.currenttmu = unit;
	qglActiveTextureARB( GL_TEXTURE0_ARB + unit );
	RB_LogComment( "glActiveTextureARB( %i )\n", unit );
}

/*
==================
RB_GLSL_DrawInteraction
==================
*/
void	RB_GLSL_DrawInteraction(const drawInteraction_t *din)
{
	static const float zero[4] = { 0, 0, 0, 0 };
	static const float one[4] = { 1, 1, 1, 1 };
	static const float negOne[4] = { -1, -1, -1, -1 };

	// load all the vertex program parameters
	GL_Uniform4fv(offsetof(shaderProgram_t, localLightOrigin), din->localLightOrigin.ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, localViewOrigin), din->localViewOrigin.ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, lightProjectionS), din->lightProjection[0].ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, lightProjectionT), din->lightProjection[1].ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, lightProjectionQ), din->lightProjection[2].ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, lightFalloff), din->lightProjection[3].ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, bumpMatrixS), din->bumpMatrix[0].ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, bumpMatrixT), din->bumpMatrix[1].ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, diffuseMatrixS), din->diffuseMatrix[0].ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, diffuseMatrixT), din->diffuseMatrix[1].ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, specularMatrixS), din->specularMatrix[0].ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, specularMatrixT), din->specularMatrix[1].ToFloatPtr());

	switch (din->vertexColor) {
		case SVC_IGNORE:
			GL_Uniform4fv(offsetof(shaderProgram_t, colorModulate), zero);
			GL_Uniform4fv(offsetof(shaderProgram_t, colorAdd), one);
			break;
		case SVC_MODULATE:
			GL_Uniform4fv(offsetof(shaderProgram_t, colorModulate), one);
			GL_Uniform4fv(offsetof(shaderProgram_t, colorAdd), zero);
			break;
		case SVC_INVERSE_MODULATE:
			GL_Uniform4fv(offsetof(shaderProgram_t, colorModulate), negOne);
			GL_Uniform4fv(offsetof(shaderProgram_t, colorAdd), one);
			break;
	}

	// set the constant colors
	GL_Uniform4fv(offsetof(shaderProgram_t, diffuseColor), din->diffuseColor.ToFloatPtr());
	GL_Uniform4fv(offsetof(shaderProgram_t, specularColor), din->specularColor.ToFloatPtr());

	// set the textures

	// texture 0 will be the per-surface bump map
	GL_SelectTextureNoClient(0);
	din->bumpImage->Bind();

	// texture 1 will be the light falloff texture
	GL_SelectTextureNoClient(1);
	din->lightFalloffImage->Bind();

	// texture 2 will be the light projection texture
	GL_SelectTextureNoClient(2);
	din->lightImage->Bind();

	// texture 3 is the per-surface diffuse map
	GL_SelectTextureNoClient(3);
	din->diffuseImage->Bind();

	// texture 4 is the per-surface specular map
	GL_SelectTextureNoClient(4);
	din->specularImage->Bind();

	// draw it
	RB_DrawElementsWithCounters(din->surf->geo);
}


/*
=============
RB_GLSL_CreateDrawInteractions

=============
*/
void RB_GLSL_CreateDrawInteractions(const drawSurf_t *surf)
{
	if (!surf) {
		return;
	}

	// perform setup here that will be constant for all interactions
	GL_State(GLS_SRCBLEND_ONE | GLS_DSTBLEND_ONE | GLS_DEPTHMASK | backEnd.depthFunc);

	// bind the vertex and fragment shader
	GL_UseProgram(&interactionShader);

	// enable the vertex arrays
	GL_EnableVertexAttribArray(offsetof(shaderProgram_t, attr_TexCoord));
	GL_EnableVertexAttribArray(offsetof(shaderProgram_t, attr_Tangent));
	GL_EnableVertexAttribArray(offsetof(shaderProgram_t, attr_Bitangent));
	GL_EnableVertexAttribArray(offsetof(shaderProgram_t, attr_Normal));
	GL_EnableVertexAttribArray(offsetof(shaderProgram_t, attr_Vertex));	// gl_Vertex
	GL_EnableVertexAttribArray(offsetof(shaderProgram_t, attr_Color));	// gl_Color

	// texture 5 is the specular lookup table
	GL_SelectTextureNoClient(5);
	globalImages->specularTableImage->Bind();

	for (; surf ; surf=surf->nextOnLight) {
		// perform setup here that will not change over multiple interaction passes

		// set the modelview matrix for the viewer
		float   mat[16];
		myGlMultMatrix(surf->space->modelViewMatrix, backEnd.viewDef->projectionMatrix, mat);
		GL_UniformMatrix4fv(offsetof(shaderProgram_t, modelViewProjectionMatrix), mat);

		// set the vertex pointers
		idDrawVert	*ac = (idDrawVert *)vertexCache.Position(surf->geo->ambientCache);

		GL_VertexAttribPointer(offsetof(shaderProgram_t, attr_Normal), 3, GL_FLOAT, false, sizeof(idDrawVert), ac->normal.ToFloatPtr());
		GL_VertexAttribPointer(offsetof(shaderProgram_t, attr_Bitangent), 3, GL_FLOAT, false, sizeof(idDrawVert), ac->tangents[1].ToFloatPtr());
		GL_VertexAttribPointer(offsetof(shaderProgram_t, attr_Tangent), 3, GL_FLOAT, false, sizeof(idDrawVert), ac->tangents[0].ToFloatPtr());
		GL_VertexAttribPointer(offsetof(shaderProgram_t, attr_TexCoord), 2, GL_FLOAT, false, sizeof(idDrawVert), ac->st.ToFloatPtr());

		GL_VertexAttribPointer(offsetof(shaderProgram_t, attr_Vertex), 3, GL_FLOAT, false, sizeof(idDrawVert), ac->xyz.ToFloatPtr());
		GL_VertexAttribPointer(offsetof(shaderProgram_t, attr_Color), 4, GL_UNSIGNED_BYTE, false, sizeof(idDrawVert), ac->color);

		// this may cause RB_GLSL_DrawInteraction to be exacuted multiple
		// times with different colors and images if the surface or light have multiple layers
		RB_CreateSingleDrawInteractions(surf, RB_GLSL_DrawInteraction);
	}

	GL_DisableVertexAttribArray(offsetof(shaderProgram_t, attr_TexCoord));
	GL_DisableVertexAttribArray(offsetof(shaderProgram_t, attr_Tangent));
	GL_DisableVertexAttribArray(offsetof(shaderProgram_t, attr_Bitangent));
	GL_DisableVertexAttribArray(offsetof(shaderProgram_t, attr_Normal));
	GL_DisableVertexAttribArray(offsetof(shaderProgram_t, attr_Vertex));	// gl_Vertex
	GL_DisableVertexAttribArray(offsetof(shaderProgram_t, attr_Color));	// gl_Color

	// disable features
	GL_SelectTextureNoClient(5);
	globalImages->BindNull();

	GL_SelectTextureNoClient(4);
	globalImages->BindNull();

	GL_SelectTextureNoClient(3);
	globalImages->BindNull();

	GL_SelectTextureNoClient(2);
	globalImages->BindNull();

	GL_SelectTextureNoClient(1);
	globalImages->BindNull();

	backEnd.glState.currenttmu = -1;
	GL_SelectTexture(0);

	GL_UseProgram(NULL);
}


/*
==================
RB_GLSL_DrawInteractions
==================
*/
void RB_GLSL_DrawInteractions( void ) {
	viewLight_t		*vLight;

	GL_SelectTexture( 0 );
	/*
	GL_DisableVertexAttribArray(offsetof(shaderProgram_t, attr_TexCoord));
	*/

	//
	// for each light, perform adding and shadowing
	//
	for ( vLight = backEnd.viewDef->viewLights ; vLight ; vLight = vLight->next ) {
		backEnd.vLight = vLight;

		// do fogging later
		if ( vLight->lightShader->IsFogLight() ) {
			continue;
		}
		if ( vLight->lightShader->IsBlendLight() ) {
			continue;
		}

		// if there are no interactions, get out!
		if ( !vLight->localInteractions && !vLight->globalInteractions && 
			!vLight->translucentInteractions ) {
			continue;
		}

		// clear the stencil buffer if needed
		if ( vLight->globalShadows || vLight->localShadows ) {
			backEnd.currentScissor = vLight->scissorRect;
			if ( r_useScissor.GetBool() ) {
				qglScissor( backEnd.viewDef->viewport.x1 + backEnd.currentScissor.x1, 
					backEnd.viewDef->viewport.y1 + backEnd.currentScissor.y1,
					backEnd.currentScissor.x2 + 1 - backEnd.currentScissor.x1,
					backEnd.currentScissor.y2 + 1 - backEnd.currentScissor.y1 );
			}
			qglClear( GL_STENCIL_BUFFER_BIT );
		} else {
			// no shadows, so no need to read or write the stencil buffer
			// we might in theory want to use GL_ALWAYS instead of disabling
			// completely, to satisfy the invarience rules
			qglStencilFunc( GL_ALWAYS, 128, 255 );
		}

		GL_UseProgram(&shadowShader);
		RB_StencilShadowPass(vLight->globalShadows);
		RB_GLSL_CreateDrawInteractions(vLight->localInteractions);
		GL_UseProgram(&shadowShader);
		RB_StencilShadowPass(vLight->localShadows);
		RB_GLSL_CreateDrawInteractions(vLight->globalInteractions);
		GL_UseProgram(NULL);	// if there weren't any globalInteractions, it would have stayed on

		// translucent surfaces never get stencil shadowed
		if ( r_skipTranslucent.GetBool() ) {
			continue;
		}

		qglStencilFunc( GL_ALWAYS, 128, 255 );

		backEnd.depthFunc = GLS_DEPTHFUNC_LESS;
		RB_GLSL_CreateDrawInteractions( vLight->translucentInteractions );
		backEnd.depthFunc = GLS_DEPTHFUNC_EQUAL;
	}

	// disable stencil shadow test
	qglStencilFunc( GL_ALWAYS, 128, 255 );

	GL_SelectTexture( 0 );
	/*
	GL_EnableVertexAttribArray(offsetof(shaderProgram_t, attr_TexCoord));
	*/
}

//===================================================================================

/*
=================
R_LoadGLSLShader

loads GLSL vertex or fragment shaders
=================
*/
bool R_LoadGLSLShader( const char *name, shaderProgram_t *shaderProgram, GLenum type ) {
	idStr	fullPath = "gl2progs/";
	fullPath += name;
	char	*fileBuffer;
	char	*buffer;

	common->Printf( "%s", fullPath.c_str() );

	// load the program even if we don't support it, so
	// fs_copyfiles can generate cross-platform data dumps
	fileSystem->ReadFile( fullPath.c_str(), (void **)&fileBuffer, NULL );
	if ( !fileBuffer ) {
		common->Printf( ": File not found\n" );
		return false;
	}

	// copy to stack memory and free
	buffer = (char *)_alloca( strlen( fileBuffer ) + 1 );
	strcpy( buffer, fileBuffer );
	fileSystem->FreeFile( fileBuffer );

	if ( !glConfig.isInitialized ) {
		return false;
	}

	GLuint shader;
	switch( type ) {
		case GL_VERTEX_SHADER_ARB:
			if (shaderProgram->vertexShader != -1)
				qglDeleteShader(shaderProgram->vertexShader);

			shaderProgram->vertexShader = -1;
			// create vertex shader
			shader = qglCreateShaderObjectARB( GL_VERTEX_SHADER_ARB );
			qglShaderSourceARB( shader, 1, (const GLcharARB **)&buffer, 0 );
			qglCompileShaderARB( shader );
			break;
		case GL_FRAGMENT_SHADER_ARB:
			if (shaderProgram->fragmentShader != -1)
				qglDeleteShader(shaderProgram->fragmentShader);

			shaderProgram->fragmentShader = -1;
			// create fragment shader
			shader = qglCreateShaderObjectARB( GL_FRAGMENT_SHADER_ARB );
			qglShaderSourceARB( shader, 1, (const GLcharARB **)&buffer, 0 );
			qglCompileShaderARB( shader );
			break;
		default:
			common->Printf( "R_LoadGLSLShader: no type\n" );
			return false;
	}
	

	GLint logLength;
	qglGetShaderiv(shader, GL_INFO_LOG_LENGTH, &logLength);
	if (logLength > 1)
	{
		GLchar *log = (GLchar *)malloc(logLength);
		qglGetShaderInfoLog(shader, logLength, &logLength, log);
		common->Printf((const char*)log);
		free(log);
	}
		
	GLint status;
	qglGetShaderiv(shader, GL_COMPILE_STATUS, &status);
	if (status == 0)
	{
		qglDeleteShader(shader);
		return false;
	}
		
	switch( type ) {
		case GL_VERTEX_SHADER_ARB:		shaderProgram->vertexShader = shader; break;
		case GL_FRAGMENT_SHADER_ARB:	shaderProgram->fragmentShader = shader; break;
	}

	common->Printf( "\n" );
	return true;
}

/*
=================
R_LinkGLSLShader

links the GLSL vertex and fragment shaders together to form a GLSL program
=================
*/
bool R_LinkGLSLShader( shaderProgram_t *shaderProgram, bool needsAttributes ) {
	char buf[BUFSIZ];
	int len;
	GLint status;
	GLint linked;

	shaderProgram->program = qglCreateProgram( );

	qglAttachShader( shaderProgram->program, shaderProgram->vertexShader );
	qglAttachShader( shaderProgram->program, shaderProgram->fragmentShader );

	if( needsAttributes ) {
		qglBindAttribLocationARB( shaderProgram->program, 8, "attr_TexCoord" );
		qglBindAttribLocationARB( shaderProgram->program, 9, "attr_Tangent" );
		qglBindAttribLocationARB( shaderProgram->program, 10, "attr_Bitangent" );
		qglBindAttribLocationARB( shaderProgram->program, 11, "attr_Normal" );
	}

	qglLinkProgram( shaderProgram->program );

	qglGetProgramiv( shaderProgram->program, GL_OBJECT_LINK_STATUS_ARB, &linked );

	if (com_developer.GetBool()) {
		qglGetShaderInfoLog(shaderProgram->vertexShader, sizeof(buf), &len, buf);
		common->Printf("VS:\n%.*s\n", len, buf);
		qglGetShaderInfoLog(shaderProgram->fragmentShader, sizeof(buf), &len, buf);
		common->Printf("FS:\n%.*s\n", len, buf);
	}

	if( !linked ) {
		common->Error( "R_LinkGLSLShader: program failed to link\n" );
		return false;
	}

	return true;
}
////
/////*
////=================
////R_ValidateGLSLProgram
////
////makes sure GLSL program is valid
////=================
////*/
////bool R_ValidateGLSLProgram( shaderProgram_t *shaderProgram ) {
////	GLint validProgram;
////
////	qglValidateProgramARB( shaderProgram->program );
////
////	qglGetProgramiv( shaderProgram->program, GL_OBJECT_VALIDATE_STATUS_ARB, &validProgram );
////	if( !validProgram ) {
////		common->Printf( "R_ValidateGLSLProgram: program invalid\n" );
////		return false;
////	}
////
////	return true;
////}
////
////static bool RB_GLSL_InitShaders( ) {
////	// todo warning: this is different in dante (RB_GLSL_GetUniformLocations)
////	#warning
////	// load interation shaders
////	R_LoadGLSLShader( "interaction.vertex", &interactionShader, GL_VERTEX_SHADER_ARB );
////	R_LoadGLSLShader( "interaction.fragment", &interactionShader, GL_FRAGMENT_SHADER_ARB );
////
////	if ( interactionShader.fragmentShader == -1 ||
////		 interactionShader.vertexShader == -1 ||
////		!R_LinkGLSLShader( &interactionShader, true ) && 
////		!R_ValidateGLSLProgram( &interactionShader ) ) 
////	{
////		if (interactionShader.fragmentShader != -1)
////			qglDeleteShader(interactionShader.fragmentShader);
////		if (interactionShader.vertexShader != -1)
////			qglDeleteShader(interactionShader.vertexShader);
////		interactionShader.fragmentShader = -1;
////		interactionShader.vertexShader = -1;
////		common->Printf( "GLSL interactionShader failed to init.\n" );
////		return false;
////	} else {
////		// set uniform locations
////		interactionShader.u_normalTexture = qglGetUniformLocationARB( interactionShader.program, "u_normalTexture" );
////		interactionShader.u_lightFalloffTexture = qglGetUniformLocationARB( interactionShader.program, "u_lightFalloffTexture" );
////		interactionShader.u_lightProjectionTexture = qglGetUniformLocationARB( interactionShader.program, "u_lightProjectionTexture" );
////		interactionShader.u_diffuseTexture = qglGetUniformLocationARB( interactionShader.program, "u_diffuseTexture" );
////		interactionShader.u_specularTexture = qglGetUniformLocationARB( interactionShader.program, "u_specularTexture" );
////
////		interactionShader.modelMatrix = qglGetUniformLocationARB( interactionShader.program, "u_modelMatrix" );
////
////		interactionShader.localLightOrigin = qglGetUniformLocationARB( interactionShader.program, "u_lightOrigin" );
////		interactionShader.localViewOrigin = qglGetUniformLocationARB( interactionShader.program, "u_viewOrigin" );
////		interactionShader.lightProjectionS = qglGetUniformLocationARB( interactionShader.program, "u_lightProjectionS" );
////		interactionShader.lightProjectionT = qglGetUniformLocationARB( interactionShader.program, "u_lightProjectionT" );
////		interactionShader.lightProjectionQ = qglGetUniformLocationARB( interactionShader.program, "u_lightProjectionQ" );
////		interactionShader.lightFalloff = qglGetUniformLocationARB( interactionShader.program, "u_lightFalloff" );
////
////		interactionShader.bumpMatrixS = qglGetUniformLocationARB( interactionShader.program, "u_bumpMatrixS" );
////		interactionShader.bumpMatrixT = qglGetUniformLocationARB( interactionShader.program, "u_bumpMatrixT" );
////		interactionShader.diffuseMatrixS = qglGetUniformLocationARB( interactionShader.program, "u_diffuseMatrixS" );
////		interactionShader.diffuseMatrixT = qglGetUniformLocationARB( interactionShader.program, "u_diffuseMatrixT" );
////		interactionShader.specularMatrixS = qglGetUniformLocationARB( interactionShader.program, "u_specularMatrixS" );
////		interactionShader.specularMatrixT = qglGetUniformLocationARB( interactionShader.program, "u_specularMatrixT" );
////
////		interactionShader.colorModulate = qglGetUniformLocationARB( interactionShader.program, "u_colorModulate" );
////		interactionShader.colorAdd = qglGetUniformLocationARB( interactionShader.program, "u_colorAdd" );
////
////		interactionShader.diffuseColor = qglGetUniformLocationARB( interactionShader.program, "u_diffuseColor" );
////		interactionShader.specularColor = qglGetUniformLocationARB( interactionShader.program, "u_specularColor" );
////
////		// set texture locations
////		qglUseProgramObjectARB( interactionShader.program );
////		qglUniform1iARB( interactionShader.u_normalTexture, 0 );
////		qglUniform1iARB( interactionShader.u_lightFalloffTexture, 1 );
////		qglUniform1iARB( interactionShader.u_lightProjectionTexture, 2 );
////		qglUniform1iARB( interactionShader.u_diffuseTexture, 3 );
////		qglUniform1iARB( interactionShader.u_specularTexture, 4 );
////		qglUseProgramObjectARB( 0 );
////	}
////
////	// load ambient interation shaders
////	R_LoadGLSLShader( "ambientInteraction.vertex", &ambientInteractionShader, GL_VERTEX_SHADER_ARB );
////	R_LoadGLSLShader( "ambientInteraction.fragment", &ambientInteractionShader, GL_FRAGMENT_SHADER_ARB );
////	if ( ambientInteractionShader.fragmentShader == -1 ||
////		 ambientInteractionShader.vertexShader == -1 ||
////		!R_LinkGLSLShader( &ambientInteractionShader, true ) && !R_ValidateGLSLProgram( &ambientInteractionShader ) ) 
////	{
////		if (ambientInteractionShader.fragmentShader != -1)
////			qglDeleteShader(ambientInteractionShader.fragmentShader);
////		if (ambientInteractionShader.vertexShader != -1)
////			qglDeleteShader(ambientInteractionShader.vertexShader);
////		ambientInteractionShader.fragmentShader = -1;
////		ambientInteractionShader.vertexShader = -1;
////		common->Printf( "GLSL ambientInteractionShader failed to init.\n" );
////		return false;
////	} else {
////		// set uniform locations
////		ambientInteractionShader.u_normalTexture = qglGetUniformLocationARB( ambientInteractionShader.program, "u_normalTexture" );
////		ambientInteractionShader.u_lightFalloffTexture = qglGetUniformLocationARB( ambientInteractionShader.program, "u_lightFalloffTexture" );
////		ambientInteractionShader.u_lightProjectionTexture = qglGetUniformLocationARB( ambientInteractionShader.program, "u_lightProjectionTexture" );
////		ambientInteractionShader.u_diffuseTexture = qglGetUniformLocationARB( ambientInteractionShader.program, "u_diffuseTexture" );
////
////		ambientInteractionShader.modelMatrix = qglGetUniformLocationARB( ambientInteractionShader.program, "u_modelMatrix" );
////
////		ambientInteractionShader.localLightOrigin = qglGetUniformLocationARB( ambientInteractionShader.program, "u_lightOrigin" );
////		ambientInteractionShader.lightProjectionS = qglGetUniformLocationARB( ambientInteractionShader.program, "u_lightProjectionS" );
////		ambientInteractionShader.lightProjectionT = qglGetUniformLocationARB( ambientInteractionShader.program, "u_lightProjectionT" );
////		ambientInteractionShader.lightProjectionQ = qglGetUniformLocationARB( ambientInteractionShader.program, "u_lightProjectionQ" );
////		ambientInteractionShader.lightFalloff = qglGetUniformLocationARB( ambientInteractionShader.program, "u_lightFalloff" );
////
////		ambientInteractionShader.bumpMatrixS = qglGetUniformLocationARB( ambientInteractionShader.program, "u_bumpMatrixS" );
////		ambientInteractionShader.bumpMatrixT = qglGetUniformLocationARB( ambientInteractionShader.program, "u_bumpMatrixT" );
////		ambientInteractionShader.diffuseMatrixS = qglGetUniformLocationARB( ambientInteractionShader.program, "u_diffuseMatrixS" );
////		ambientInteractionShader.diffuseMatrixT = qglGetUniformLocationARB( ambientInteractionShader.program, "u_diffuseMatrixT" );
////
////		ambientInteractionShader.colorModulate = qglGetUniformLocationARB( ambientInteractionShader.program, "u_colorModulate" );
////		ambientInteractionShader.colorAdd = qglGetUniformLocationARB( ambientInteractionShader.program, "u_colorAdd" );
////
////		ambientInteractionShader.diffuseColor = qglGetUniformLocationARB( ambientInteractionShader.program, "u_diffuseColor" );
////
////		// set texture locations
////		qglUseProgramObjectARB( ambientInteractionShader.program );
////		qglUniform1iARB( ambientInteractionShader.u_normalTexture, 0 );
////		qglUniform1iARB( ambientInteractionShader.u_lightFalloffTexture, 1 );
////		qglUniform1iARB( ambientInteractionShader.u_lightProjectionTexture, 2 );
////		qglUniform1iARB( ambientInteractionShader.u_diffuseTexture, 3 );
////		qglUseProgramObjectARB( 0 );
////	}
////
////	// load stencil shadow extrusion shaders
////	R_LoadGLSLShader( "stencilshadow.vertex", &stencilShadowShader, GL_VERTEX_SHADER_ARB );
////	R_LoadGLSLShader( "stencilshadow.fragment", &stencilShadowShader, GL_FRAGMENT_SHADER_ARB );
////	if ( stencilShadowShader.fragmentShader == -1 ||
////		 stencilShadowShader.vertexShader == -1 ||
////		 !R_LinkGLSLShader( &stencilShadowShader, false ) && !R_ValidateGLSLProgram( &stencilShadowShader ) ) {
////		if (stencilShadowShader.fragmentShader != -1)
////			qglDeleteShader(stencilShadowShader.fragmentShader);
////		if (stencilShadowShader.vertexShader != -1)
////			qglDeleteShader(stencilShadowShader.vertexShader);
////		stencilShadowShader.fragmentShader = -1;
////		stencilShadowShader.vertexShader = -1;
////		common->Printf( "GLSL stencilShadowShader failed to init.\n" );
////		return false;
////	} else {
////		// set uniform locations
////		stencilShadowShader.localLightOrigin = qglGetUniformLocationARB( stencilShadowShader.program, "u_lightOrigin" );
////	}
////
////	return true;
////}
////
/////*
////==================
////R_ReloadGLSLShaders_f
////==================
////*/
////void R_ReloadGLSLShaders_f( const idCmdArgs &args ) {
////	common->Printf( "----- R_ReloadGLSLShaders -----\n" );
////	if ( glConfig.GLSLAvailable ) {	
////		if (RB_GLSL_InitShaders())
////		{
////			glConfig.allowGLSLPath = true;
////		} else
////			common->Printf( "GLSL shaders failed to init.\n" );
////	} else		
////		common->Printf( "Not available.\n" );
////	common->Printf( "-------------------------------\n" );
////}
////
////void R_GLSL_Init( void ) {
////	glConfig.allowGLSLPath = false;
////
////	common->Printf( "---------- R_GLSL_Init -----------\n" );
////
////	if ( !glConfig.GLSLAvailable ) {
////		common->Printf( "Not available.\n" );
////		return;
////	} else if ( !RB_GLSL_InitShaders() ) {
////		common->Printf( "GLSL shaders failed to init.\n" );
////		return;
////	}
////	
////	common->Printf( "Available.\n" );
////
////	common->Printf( "---------------------------------\n" );
////
////	glConfig.allowGLSLPath = true;
////}
////



/*
=================
R_ValidateGLSLProgram

makes sure GLSL program is valid
=================
*/
static bool R_ValidateGLSLProgram(shaderProgram_t *shaderProgram)
{
	GLint validProgram;

	qglValidateProgram(shaderProgram->program);

	qglGetProgramiv(shaderProgram->program, GL_VALIDATE_STATUS, &validProgram);

	if (!validProgram) {
		common->Printf("R_ValidateGLSLProgram: program invalid\n");
		return false;
	}

	return true;
}


static void RB_GLSL_GetUniformLocations(shaderProgram_t *shader)
{
	shader->localLightOrigin = qglGetUniformLocationARB(shader->program, "u_lightOrigin");
	shader->localViewOrigin = qglGetUniformLocationARB(shader->program, "u_viewOrigin");
	shader->lightProjectionS = qglGetUniformLocationARB(shader->program, "u_lightProjectionS");
	shader->lightProjectionT = qglGetUniformLocationARB(shader->program, "u_lightProjectionT");
	shader->lightProjectionQ = qglGetUniformLocationARB(shader->program, "u_lightProjectionQ");
	shader->lightFalloff = qglGetUniformLocationARB(shader->program, "u_lightFalloff");
	shader->bumpMatrixS = qglGetUniformLocationARB(shader->program, "u_bumpMatrixS");
	shader->bumpMatrixT = qglGetUniformLocationARB(shader->program, "u_bumpMatrixT");
	shader->diffuseMatrixS = qglGetUniformLocationARB(shader->program, "u_diffuseMatrixS");
	shader->diffuseMatrixT = qglGetUniformLocationARB(shader->program, "u_diffuseMatrixT");
	shader->specularMatrixS = qglGetUniformLocationARB(shader->program, "u_specularMatrixS");
	shader->specularMatrixT = qglGetUniformLocationARB(shader->program, "u_specularMatrixT");
	shader->colorModulate = qglGetUniformLocationARB(shader->program, "u_colorModulate");
	shader->colorAdd = qglGetUniformLocationARB(shader->program, "u_colorAdd");
	shader->diffuseColor = qglGetUniformLocationARB(shader->program, "u_diffuseColor");
	shader->specularColor = qglGetUniformLocationARB(shader->program, "u_specularColor");
	shader->glColor = qglGetUniformLocationARB(shader->program, "u_glColor");
	shader->alphaTest = qglGetUniformLocationARB(shader->program, "u_alphaTest");

	shader->eyeOrigin = qglGetUniformLocationARB(shader->program, "u_eyeOrigin");
	shader->localEyeOrigin = qglGetUniformLocationARB(shader->program, "u_localEyeOrigin");
	shader->nonPowerOfTwo = qglGetUniformLocationARB(shader->program, "u_nonPowerOfTwo");
	shader->windowCoords = qglGetUniformLocationARB(shader->program, "u_windowCoords");

	shader->u_bumpTexture = qglGetUniformLocationARB(shader->program, "u_bumpTexture");
	shader->u_lightFalloffTexture = qglGetUniformLocationARB(shader->program, "u_lightFalloffTexture");
	shader->u_lightProjectionTexture = qglGetUniformLocationARB(shader->program, "u_lightProjectionTexture");
	shader->u_diffuseTexture = qglGetUniformLocationARB(shader->program, "u_diffuseTexture");
	shader->u_specularTexture = qglGetUniformLocationARB(shader->program, "u_specularTexture");
	shader->u_specularFalloffTexture = qglGetUniformLocationARB(shader->program, "u_specularFalloffTexture");

	shader->modelViewProjectionMatrix = qglGetUniformLocationARB(shader->program, "u_modelViewProjectionMatrix");

	shader->modelMatrix = qglGetUniformLocationARB(shader->program, "u_modelMatrix");
	shader->textureMatrix = qglGetUniformLocationARB(shader->program, "u_textureMatrix");

	shader->attr_TexCoord = glGetAttribLocation(shader->program, "attr_TexCoord");
	shader->attr_Tangent = glGetAttribLocation(shader->program, "attr_Tangent");
	shader->attr_Bitangent = glGetAttribLocation(shader->program, "attr_Bitangent");
	shader->attr_Normal = glGetAttribLocation(shader->program, "attr_Normal");
	shader->attr_Vertex = glGetAttribLocation(shader->program, "attr_Vertex");
	shader->attr_Color = glGetAttribLocation(shader->program, "attr_Color");

	// set texture locations
	GL_UseProgram(shader);
	glUniform1iARB(shader->u_bumpTexture, 0);
	glUniform1iARB(shader->u_lightFalloffTexture, 1);
	glUniform1iARB(shader->u_lightProjectionTexture, 2);
	glUniform1iARB(shader->u_diffuseTexture, 3);
	glUniform1iARB(shader->u_specularTexture, 4);
	glUniform1iARB(shader->u_specularFalloffTexture, 5);
	GL_UseProgram(NULL);
}

static bool RB_GLSL_InitShaders(void)
{
	memset(&interactionShader, 0, sizeof(shaderProgram_t));
	memset(&shadowShader, 0, sizeof(shaderProgram_t));
	memset(&defaultShader, 0, sizeof(shaderProgram_t));
	memset(&depthFillShader, 0, sizeof(shaderProgram_t));

	// load interation shaders
	R_LoadGLSLShader("interaction.vert", &interactionShader, GL_VERTEX_SHADER);
	R_LoadGLSLShader("interaction.frag", &interactionShader, GL_FRAGMENT_SHADER);

	if (!R_LinkGLSLShader(&interactionShader, true) && !R_ValidateGLSLProgram(&interactionShader)) {
		return false;
	} else {
		RB_GLSL_GetUniformLocations(&interactionShader);
	}

	// load stencil shadow extrusion shaders
	R_LoadGLSLShader("shadow.vert", &shadowShader, GL_VERTEX_SHADER);
	R_LoadGLSLShader("shadow.frag", &shadowShader, GL_FRAGMENT_SHADER);

	if (!R_LinkGLSLShader(&shadowShader, true) && !R_ValidateGLSLProgram(&shadowShader)) {
		return false;
	} else {
		RB_GLSL_GetUniformLocations(&shadowShader);
	}

	// load default interation shaders
	R_LoadGLSLShader("default.vert", &defaultShader, GL_VERTEX_SHADER);
	R_LoadGLSLShader("default.frag", &defaultShader, GL_FRAGMENT_SHADER);

	if (!R_LinkGLSLShader(&defaultShader, true) && !R_ValidateGLSLProgram(&defaultShader)) {
		return false;
	} else {
		RB_GLSL_GetUniformLocations(&defaultShader);
	}

	// load default interation shaders
	R_LoadGLSLShader("zfill.vert", &depthFillShader, GL_VERTEX_SHADER);
	R_LoadGLSLShader("zfill.frag", &depthFillShader, GL_FRAGMENT_SHADER);

	if (!R_LinkGLSLShader(&depthFillShader, true) && !R_ValidateGLSLProgram(&depthFillShader)) {
		return false;
	} else {
		RB_GLSL_GetUniformLocations(&depthFillShader);
	}

	return true;
}

/*
==================
R_ReloadGLSLPrograms_f
==================
*/
void R_ReloadGLSLPrograms_f(const idCmdArgs &args)
{
	int		i;

	common->Printf("----- R_ReloadGLSLPrograms -----\n");

	if (!RB_GLSL_InitShaders()) {
		common->Printf("GLSL shaders failed to init.\n");
	}

	glConfig.allowGLSLPath = true;

	common->Printf("-------------------------------\n");
}

void R_GLSL_Init(void)
{
	glConfig.allowGLSLPath = false;

	common->Printf("---------- R_GLSL_Init ----------\n");

#if !defined(GL_ES_VERSION_2_0)

	if (!glConfig.GLSLAvailable) {
		common->Printf("Not available.\n");
		return;
	}

#endif

	common->Printf("Available.\n");

	common->Printf("---------------------------------\n");
}