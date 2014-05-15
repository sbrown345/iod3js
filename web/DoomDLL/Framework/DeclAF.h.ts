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
////#ifndef __DECLAF_H__
////#define __DECLAF_H__

/*
===============================================================================

	Articulated Figure

===============================================================================
*/

//class idDeclAF; // in cpp file

enum declAFConstraintType_t{
	DECLAF_CONSTRAINT_INVALID,
	DECLAF_CONSTRAINT_FIXED,
	DECLAF_CONSTRAINT_BALLANDSOCKETJOINT,
	DECLAF_CONSTRAINT_UNIVERSALJOINT,
	DECLAF_CONSTRAINT_HINGE,
	DECLAF_CONSTRAINT_SLIDER,
	DECLAF_CONSTRAINT_SPRING
}

enum declAFJointMod_t{
	DECLAF_JOINTMOD_AXIS,
	DECLAF_JOINTMOD_ORIGIN,
	DECLAF_JOINTMOD_BOTH
}

enum idAFVector_type  {
VEC_COORDS = 0,
VEC_JOINT ,
VEC_BONECENTER ,
VEC_BONEDIR
}

////
////typedef bool (*getJointTransform_t)( void *model, const idJointMat *frame, const char *jointName, idVec3 &origin, idMat3 &axis );
////
class idAFVector {
////public:
	type: idAFVector_type;
	joint1 = new idStr;
	joint2 = new idStr;
////
////public:
////							idAFVector( );
////
////	bool					Parse( idLexer &src );
////	bool					Finish( const char *fileName, const getJointTransform_t GetJointTransform, const idJointMat *frame, void *model ) const;
////	bool					Write( idFile *f ) const;
////	const char *			ToString( idStr &str, const int precision = 8 );
////	const idVec3 &			ToVec3( ) const { return vec; }
////	idVec3 &				ToVec3( ) { return vec; }
////
////private:
	vec = new idVec3; //mutable
	negate: boolean;

	
/*
================
idAFVector::idAFVector
================
*/
constructor( ) {
	this.type = idAFVector_type.VEC_COORDS;
	this.vec.Zero();
	this.negate = false;
}

/*
================
idAFVector::Parse
================
*/
	Parse(src: idLexer): boolean{
		todoThrow()
////	var token = new idToken;
////
////	if ( !src.ReadToken( token ) ) {
////		return false;
////	}
////
////	if ( token == "-" ) {
////		negate = true;
////		if ( !src.ReadToken( token ) ) {
////			return false;
////		}
////	}
////	else {
////		negate = false;
////	}
////
////	if ( token == "(" ) {
////		type = idAFVector_type.VEC_COORDS;
////		vec.x = src.ParseFloat();
////		src.ExpectTokenString( "," );
////		vec.y = src.ParseFloat();
////		src.ExpectTokenString( "," );
////		vec.z = src.ParseFloat();
////		src.ExpectTokenString( ")" );
////	}
////	else if ( token == "joint" ) {
////		type = idAFVector_type.VEC_JOINT;
////		src.ExpectTokenString( "(" );
////		src.ReadToken( token );
////		joint1 = token;
////		src.ExpectTokenString( ")" );
////	}
////	else if ( token == "bonecenter" ) {
////		type = idAFVector_type.VEC_BONECENTER;
////		src.ExpectTokenString( "(" );
////		src.ReadToken( token );
////		joint1 = token;
////		src.ExpectTokenString( "," );
////		src.ReadToken( token );
////		joint2 = token;
////		src.ExpectTokenString( ")" );
////	}
////	else if ( token == "bonedir" ) {
////		type = idAFVector_type.VEC_BONEDIR;
////		src.ExpectTokenString( "(" );
////		src.ReadToken( token );
////		joint1 = token;
////		src.ExpectTokenString( "," );
////		src.ReadToken( token );
////		joint2 = token;
////		src.ExpectTokenString( ")" );
////	}
////	else {
////		src.Error( "unknown token %s in vector", token.c_str() );
////		return false;
////	}
////
	return true;
}

/*
================
idAFVector::Finish
================
*/
	Finish ( fileName: string, GetJointTransform: ( model: any, frame: idJointMat[], jointName: string, origin: idVec3, axis: idMat3 ) => boolean, frame: idJointMat[], model: any ): boolean {
		todoThrow ( );
////	idMat3 axis;
////	idVec3 start, end;
////
////	switch( type ) {
////		case idAFVector_type.VEC_COORDS: {
////			break;
////		}
////		case idAFVector_type.VEC_JOINT: {
////			if ( !GetJointTransform( model, frame, joint1, vec, axis ) ) {
////				common.Warning( "invalid joint %s in joint() in '%s'", joint1.c_str(), fileName );
////				vec.Zero();
////			}
////			break;
////		}
////		case idAFVector_type.VEC_BONECENTER: {
////			if ( !GetJointTransform( model, frame, joint1, start, axis ) ) {
////				common.Warning( "invalid joint %s in bonecenter() in '%s'", joint1.c_str(), fileName );
////				start.Zero();
////			}
////			if ( !GetJointTransform( model, frame, joint2, end, axis ) ) {
////				common.Warning( "invalid joint %s in bonecenter() in '%s'", joint2.c_str(), fileName );
////				end.Zero();
////			}
////			vec = ( start + end ) * 0.5;
////			break;
////		}
////		case idAFVector_type.VEC_BONEDIR: {
////			if ( !GetJointTransform( model, frame, joint1, start, axis ) ) {
////				common.Warning( "invalid joint %s in bonedir() in '%s'", joint1.c_str(), fileName );
////				start.Zero();
////			}
////			if ( !GetJointTransform( model, frame, joint2, end, axis ) ) {
////				common.Warning( "invalid joint %s in bonedir() in '%s'", joint2.c_str(), fileName );
////				end.Zero();
////			}
////			vec = ( end - start );
////			break;
////		}
////		default: {
////			vec.Zero();
////			break;
////		}
////	}
////
////	if ( negate ) {
////		vec = -vec;
////	}
////
		return true;
	}
////
/////*
////================
////idAFVector::Write
////================
////*/
////bool idAFVector::Write( idFile *f ) const {
////
////	if ( negate ) {
////		f.WriteFloatString( "-" );
////	}
////	switch( type ) {
////		case idAFVector_type.VEC_COORDS: {
////			f.WriteFloatString( "( %f, %f, %f )", vec.x, vec.y, vec.z );
////			break;
////		}
////		case idAFVector_type.VEC_JOINT: {
////			f.WriteFloatString( "joint( \"%s\" )", joint1.c_str() );
////			break;
////		}
////		case idAFVector_type.VEC_BONECENTER: {
////			f.WriteFloatString( "bonecenter( \"%s\", \"%s\" )", joint1.c_str(), joint2.c_str() );
////			break;
////		}
////		case idAFVector_type.VEC_BONEDIR: {
////			f.WriteFloatString( "bonedir( \"%s\", \"%s\" )", joint1.c_str(), joint2.c_str() );
////			break;
////		}
////		default: {
////			break;
////		}
////	}
////	return true;
////}
////
/////*
////================
////idAFVector::ToString
////================
////*/
////const char *idAFVector::ToString( idStr &str, const int precision ) {
////
////	switch( type ) {
////		case idAFVector_type.VEC_COORDS: {
////			char format[128];
////			sprintf( format, "( %%.%df, %%.%df, %%.%df )", precision, precision, precision );
////			sprintf( str, format, vec.x, vec.y, vec.z );
////			break;
////		}
////		case idAFVector_type.VEC_JOINT: {
////			sprintf( str, "joint( \"%s\" )", joint1.c_str() );
////			break;
////		}
////		case idAFVector_type.VEC_BONECENTER: {
////			sprintf( str, "bonecenter( \"%s\", \"%s\" )", joint1.c_str(), joint2.c_str() );
////			break;
////		}
////		case idAFVector_type.VEC_BONEDIR: {
////			sprintf( str, "bonedir( \"%s\", \"%s\" )", joint1.c_str(), joint2.c_str() );
////			break;
////		}
////		default: {
////			break;
////		}
////	}
////	if ( negate ) {
////		str = "-" + str;
////	}
////	return str.c_str();
////}
////
};
////
class idDeclAF_Body {
////public:
	name = new idStr;
	jointName = new idStr;
	jointMod:declAFJointMod_t;
	modelType :number/*int*/;
	v1 = new idAFVector; v2 = new idAFVector;
	numSides :number/*int*/;
	width :number/*float*/;
	density :number/*float*/;
	origin = new idAFVector;
	angles = new idAngles;
	contents:number/*int*/;
	clipMask:number/*int*/;
	selfCollision:boolean;
	inertiaScale = idMat3;
	linearFriction:number/*float*/;
	angularFriction:number/*float*/;
	contactFriction:number/*float*/;
	containedJoints = new idStr
	frictionDirection = new idAFVector;
	contactMotorDirection = new idAFVector;
////public:
////	void					SetDefault( const idDeclAF *file );

	
/////*
////================
////idDeclAF_Body::SetDefault
////================
////*/
////void idDeclAF_Body::SetDefault( const idDeclAF *file ) {
////	name = "noname";
////	modelType = traceModel_t.TRM_BOX;
////	v1.type = idAFVector_type.VEC_COORDS;
////	v1.ToVec3().x = v1.ToVec3().y = v1.ToVec3().z = -10.0;
////	v2.type = idAFVector_type.VEC_COORDS;
////	v2.ToVec3().x = v2.ToVec3().y = v2.ToVec3().z = 10.0;
////	numSides = 3;
////	origin.ToVec3().Zero();
////	angles.Zero();
////	density = 0.2;
////	inertiaScale.Identity();
////	linearFriction = file.defaultLinearFriction;
////	angularFriction = file.defaultAngularFriction;
////	contactFriction = file.defaultContactFriction;
////	contents = file.contents;
////	clipMask = file.clipMask;
////	selfCollision = file.selfCollision;
////	frictionDirection.ToVec3().Zero();
////	contactMotorDirection.ToVec3().Zero();
////	jointName = "origin";
////	jointMod = declAFJointMod_t.DECLAF_JOINTMOD_AXIS;
////	containedJoints = "*origin";
////}
////
};

class idDeclAF_Constraint {
////public:
	name = new idStr;
	body1 = new idStr;
	body2 = new idStr;
	type:declAFConstraintType_t;
	friction:number/*float*/;
	stretch:number/*float*/;
	compress:number/*float*/;
	damping:number/*float*/;
	restLength:number/*float*/;
	minLength:number/*float*/;
	maxLength:number/*float*/;
	anchor = new idAFVector;
	anchor2 = new idAFVector;
	shaft = [new idAFVector, new idAFVector];
	axis = new idAFVector;
////	enum {
////		LIMIT_NONE = -1,
////		LIMIT_CONE,
////		LIMIT_PYRAMID
////	}						limit;
	limitAxis = new idAFVector;
	limitAngles = new Float32Array(3);
////
////public:
////	void					SetDefault( const idDeclAF *file );
	
/////*
////================
////idDeclAF_Constraint::SetDefault
////================
////*/
////void idDeclAF_Constraint::SetDefault( const idDeclAF *file ) {
////	name = "noname";
////	type = declAFConstraintType_t.DECLAF_CONSTRAINT_UNIVERSALJOINT;
////	if ( file.bodies.Num() ) {
////		body1 = file.bodies[0].name;
////	}
////	else {
////		body1 = "world";
////	}
////	body2 = "world";
////	friction = file.defaultConstraintFriction;
////	anchor.ToVec3().Zero();
////	anchor2.ToVec3().Zero();
////	axis.ToVec3().Set( 1.0, 0.0, 0.0 );
////	shaft[0].ToVec3().Set( 0.0, 0.0, -1.0 );
////	shaft[1].ToVec3().Set( 0.0, 0.0, 1.0 );
////	limit = idDeclAF_Constraint::LIMIT_NONE;
////	limitAngles[0] =
////	limitAngles[1] =
////	limitAngles[2] = 0.0;
////	limitAxis.ToVec3().Set( 0.0, 0.0, -1.0 );
////}

};

class idDeclAF extends idDecl {
////	friend class idAFFileManager;
////public:
////							idDeclAF( );
////	virtual					~idDeclAF( );
////
////	virtual size_t			Size( ) const;
////	virtual const char *	DefaultDefinition( ) const;
////	virtual bool			Parse( text:string, const int textLength );
////	virtual void			FreeData( );
////
////	virtual void			Finish( const getJointTransform_t GetJointTransform, const idJointMat *frame, void *model ) const;
////
////	bool					Save( );
////
////	void					NewBody( name:string );
////	void					RenameBody( const char *oldName, const char *newName );
////	void					DeleteBody( name:string );
////
////	void					NewConstraint( name:string );
////	void					RenameConstraint( const char *oldName, const char *newName );
////	void					DeleteConstraint( name:string );
////
////	static int				ContentsFromString( const char *str );
////	static const char *		ContentsToString( const int contents, idStr &str );
////
////	static declAFJointMod_t	JointModFromString( const char *str );
////	static const char *		JointModToString( declAFJointMod_t jointMod );
////
////public:
	modified:boolean;
	model = new idStr;
	skin = new idStr;
	defaultLinearFriction :number/*float*/;
	defaultAngularFriction :number/*float*/;
	defaultContactFriction :number/*float*/;
	defaultConstraintFriction :number/*float*/;
	totalMass :number/*float*/;
	suspendVelocity = new idVec2;
	suspendAcceleration= new idVec2;
	noMoveTime :number/*float*/;
	noMoveTranslation :number/*float*/;
	noMoveRotation :number/*float*/;
	minMoveTime :number/*float*/;
	maxMoveTime :number/*float*/;
	contents :number/*int*/;
	clipMask :number/*int*/;
	selfCollision:boolean;
	bodies = new idList<idDeclAF_Body>(idDeclAF_Body, true);
	constraints = new idList<idDeclAF_Constraint>(idDeclAF_Constraint, true);
////
////private:
////	bool					ParseContents( idLexer &src, int &c ) const;
////	bool					ParseBody( idLexer &src );
////	bool					ParseFixed( idLexer &src );
////	bool					ParseBallAndSocketJoint( idLexer &src );
////	bool					ParseUniversalJoint( idLexer &src );
////	bool					ParseHinge( idLexer &src );
////	bool					ParseSlider( idLexer &src );
////	bool					ParseSpring( idLexer &src );
////	bool					ParseSettings( idLexer &src );
////
////	bool					WriteBody( idFile *f, const idDeclAF_Body &body ) const;
////	bool					WriteFixed( idFile *f, const idDeclAF_Constraint &c ) const;
////	bool					WriteBallAndSocketJoint( idFile *f, const idDeclAF_Constraint &c ) const;
////	bool					WriteUniversalJoint( idFile *f, const idDeclAF_Constraint &c ) const;
////	bool					WriteHinge( idFile *f, const idDeclAF_Constraint &c ) const;
////	bool					WriteSlider( idFile *f, const idDeclAF_Constraint &c ) const;
////	bool					WriteSpring( idFile *f, const idDeclAF_Constraint &c ) const;
////	bool					WriteConstraint( idFile *f, const idDeclAF_Constraint &c ) const;
////	bool					WriteSettings( idFile *f ) const;
////
////	bool					RebuildTextSource( );


	/////*
	////================
	////idDeclAF::WriteBody
	////================
	////*/
	////bool idDeclAF::WriteBody( idFile *f, const idDeclAF_Body &body ) const {
	////	var str = new idStr;
	////
	////	f.WriteFloatString( "\nbody \"%s\" {\n", body.name.c_str() );
	////	f.WriteFloatString( "\tjoint \"%s\"\n", body.jointName.c_str() );
	////	f.WriteFloatString( "\tmod %s\n", JointModToString( body.jointMod ) );
	////	switch( body.modelType ) {
	////		case traceModel_t.TRM_BOX: {
	////	        f.WriteFloatString( "\tmodel box( " );
	////			body.v1.Write( f );
	////			f.WriteFloatString( ", " );
	////			body.v2.Write( f );
	////			f.WriteFloatString( " )\n" );
	////			break;
	////		}
	////		case traceModel_t.TRM_OCTAHEDRON: {
	////	        f.WriteFloatString( "\tmodel octahedron( " );
	////			body.v1.Write( f );
	////			f.WriteFloatString( ", " );
	////			body.v2.Write( f );
	////			f.WriteFloatString( " )\n" );
	////			break;
	////		}
	////		case traceModel_t.TRM_DODECAHEDRON: {
	////	        f.WriteFloatString( "\tmodel dodecahedron( " );
	////			body.v1.Write( f );
	////			f.WriteFloatString( ", " );
	////			body.v2.Write( f );
	////			f.WriteFloatString( " )\n" );
	////			break;
	////		}
	////		case traceModel_t.TRM_CYLINDER: {
	////	        f.WriteFloatString( "\tmodel cylinder( " );
	////			body.v1.Write( f );
	////			f.WriteFloatString( ", " );
	////			body.v2.Write( f );
	////			f.WriteFloatString( ", %d )\n", body.numSides );
	////			break;
	////		}	
	////		case traceModel_t.TRM_CONE: {
	////	        f.WriteFloatString( "\tmodel cone( " );
	////			body.v1.Write( f );
	////			f.WriteFloatString( ", " );
	////			body.v2.Write( f );
	////			f.WriteFloatString( ", %d )\n", body.numSides );
	////			break;
	////		}
	////		case traceModel_t.TRM_BONE: {
	////	        f.WriteFloatString( "\tmodel bone( " );
	////			body.v1.Write( f );
	////			f.WriteFloatString( ", " );
	////			body.v2.Write( f );
	////			f.WriteFloatString( ", %f )\n", body.width );
	////			break;
	////		}
	////		default:
	////			assert( 0 );
	////			break;
	////	}
	////	f.WriteFloatString( "\torigin " );
	////	body.origin.Write( f );
	////	f.WriteFloatString( "\n" );
	////	if ( body.angles != ang_zero ) {
	////		f.WriteFloatString( "\tangles ( %f, %f, %f )\n", body.angles.pitch, body.angles.yaw, body.angles.roll );
	////	}
	////	f.WriteFloatString( "\tdensity %f\n", body.density );
	////	if ( body.inertiaScale != mat3_identity ) {
	////		const idMat3 &ic = body.inertiaScale;
	////		f.WriteFloatString( "\tinertiaScale (%f %f %f %f %f %f %f %f %f)\n",
	////												ic[0][0], ic[0][1], ic[0][2],
	////												ic[1][0], ic[1][1], ic[1][2],
	////												ic[2][0], ic[2][1], ic[2][2] );
	////	}
	////	if ( body.linearFriction != -1 ) {
	////		f.WriteFloatString( "\tfriction %f, %f, %f\n", body.linearFriction, body.angularFriction, body.contactFriction );
	////	}
	////	f.WriteFloatString( "\tcontents %s\n", ContentsToString( body.contents, str ) );
	////	f.WriteFloatString( "\tclipMask %s\n", ContentsToString( body.clipMask, str ) );
	////	f.WriteFloatString( "\tselfCollision %d\n", body.selfCollision );
	////	if ( body.frictionDirection.ToVec3() != vec3_origin ) {
	////		f.WriteFloatString( "\tfrictionDirection " );
	////		body.frictionDirection.Write( f );
	////		f.WriteFloatString( "\n" );
	////	}
	////	if ( body.contactMotorDirection.ToVec3() != vec3_origin ) {
	////		f.WriteFloatString( "\tcontactMotorDirection " );
	////		body.contactMotorDirection.Write( f );
	////		f.WriteFloatString( "\n" );
	////	}
	////	f.WriteFloatString( "\tcontainedJoints \"%s\"\n", body.containedJoints.c_str() );
	////	f.WriteFloatString( "}\n" );
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::WriteFixed
	////================
	////*/
	////bool idDeclAF::WriteFixed( idFile *f, const idDeclAF_Constraint &c ) const {
	////	f.WriteFloatString( "\nfixed \"%s\" {\n", c.name.c_str() );
	////	f.WriteFloatString( "\tbody1 \"%s\"\n", c.body1.c_str() );
	////	f.WriteFloatString( "\tbody2 \"%s\"\n", c.body2.c_str() );
	////	f.WriteFloatString( "}\n" );
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::WriteBallAndSocketJoint
	////================
	////*/
	////bool idDeclAF::WriteBallAndSocketJoint( idFile *f, const idDeclAF_Constraint &c ) const {
	////	f.WriteFloatString( "\nballAndSocketJoint \"%s\" {\n", c.name.c_str() );
	////	f.WriteFloatString( "\tbody1 \"%s\"\n", c.body1.c_str() );
	////	f.WriteFloatString( "\tbody2 \"%s\"\n", c.body2.c_str() );
	////	f.WriteFloatString( "\tanchor " );
	////	c.anchor.Write( f );
	////	f.WriteFloatString( "\n" );
	////	f.WriteFloatString( "\tfriction %f\n", c.friction );
	////	if ( c.limit == idDeclAF_Constraint::LIMIT_CONE ) {
	////		f.WriteFloatString( "\tconeLimit " );
	////		c.limitAxis.Write( f );
	////		f.WriteFloatString( ", %f, ", c.limitAngles[0] );
	////		c.shaft[0].Write( f );
	////		f.WriteFloatString( "\n" );
	////	}
	////	else if ( c.limit == idDeclAF_Constraint::LIMIT_PYRAMID ) {
	////		f.WriteFloatString( "\tpyramidLimit " );
	////		c.limitAxis.Write( f );
	////		f.WriteFloatString( ", %f, %f, %f, ", c.limitAngles[0], c.limitAngles[1], c.limitAngles[2] );
	////		c.shaft[0].Write( f );
	////		f.WriteFloatString( "\n" );
	////	}
	////	f.WriteFloatString( "}\n" );
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::WriteUniversalJoint
	////================
	////*/
	////bool idDeclAF::WriteUniversalJoint( idFile *f, const idDeclAF_Constraint &c ) const {
	////	f.WriteFloatString( "\nuniversalJoint \"%s\" {\n", c.name.c_str() );
	////	f.WriteFloatString( "\tbody1 \"%s\"\n", c.body1.c_str() );
	////	f.WriteFloatString( "\tbody2 \"%s\"\n", c.body2.c_str() );
	////	f.WriteFloatString( "\tanchor " );
	////	c.anchor.Write( f );
	////	f.WriteFloatString( "\n" );
	////	f.WriteFloatString( "\tshafts " );
	////	c.shaft[0].Write( f );
	////	f.WriteFloatString( ", " );
	////	c.shaft[1].Write( f );
	////	f.WriteFloatString( "\n" );
	////	f.WriteFloatString( "\tfriction %f\n", c.friction );
	////	if ( c.limit == idDeclAF_Constraint::LIMIT_CONE ) {
	////		f.WriteFloatString( "\tconeLimit " );
	////		c.limitAxis.Write( f );
	////		f.WriteFloatString( ", %f\n", c.limitAngles[0] );
	////	}
	////	else if ( c.limit == idDeclAF_Constraint::LIMIT_PYRAMID ) {
	////		f.WriteFloatString( "\tpyramidLimit " );
	////		c.limitAxis.Write( f );
	////		f.WriteFloatString( ", %f, %f, %f\n", c.limitAngles[0], c.limitAngles[1], c.limitAngles[2] );
	////	}
	////	f.WriteFloatString( "}\n" );
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::WriteHinge
	////================
	////*/
	////bool idDeclAF::WriteHinge( idFile *f, const idDeclAF_Constraint &c ) const {
	////	f.WriteFloatString( "\nhinge \"%s\" {\n", c.name.c_str() );
	////	f.WriteFloatString( "\tbody1 \"%s\"\n", c.body1.c_str() );
	////	f.WriteFloatString( "\tbody2 \"%s\"\n", c.body2.c_str() );
	////	f.WriteFloatString( "\tanchor " );
	////	c.anchor.Write( f );
	////	f.WriteFloatString( "\n" );
	////	f.WriteFloatString( "\taxis " );
	////	c.axis.Write( f );
	////	f.WriteFloatString( "\n" );
	////	f.WriteFloatString( "\tfriction %f\n", c.friction );
	////	if ( c.limit == idDeclAF_Constraint::LIMIT_CONE ) {
	////		f.WriteFloatString( "\tlimit " );
	////		f.WriteFloatString( "%f, %f, %f", c.limitAngles[0], c.limitAngles[1], c.limitAngles[2] );
	////		f.WriteFloatString( "\n" );
	////	}
	////	f.WriteFloatString( "}\n" );
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::WriteSlider
	////================
	////*/
	////bool idDeclAF::WriteSlider( idFile *f, const idDeclAF_Constraint &c ) const {
	////	f.WriteFloatString( "\nslider \"%s\" {\n", c.name.c_str() );
	////	f.WriteFloatString( "\tbody1 \"%s\"\n", c.body1.c_str() );
	////	f.WriteFloatString( "\tbody2 \"%s\"\n", c.body2.c_str() );
	////	f.WriteFloatString( "\taxis " );
	////	c.axis.Write( f );
	////	f.WriteFloatString( "\n" );
	////	f.WriteFloatString( "\tfriction %f\n", c.friction );
	////	f.WriteFloatString( "}\n" );
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::WriteSpring
	////================
	////*/
	////bool idDeclAF::WriteSpring( idFile *f, const idDeclAF_Constraint &c ) const {
	////	f.WriteFloatString( "\nspring \"%s\" {\n", c.name.c_str() );
	////	f.WriteFloatString( "\tbody1 \"%s\"\n", c.body1.c_str() );
	////	f.WriteFloatString( "\tbody2 \"%s\"\n", c.body2.c_str() );
	////	f.WriteFloatString( "\tanchor1 " );
	////	c.anchor.Write( f );
	////	f.WriteFloatString( "\n" );
	////	f.WriteFloatString( "\tanchor2 " );
	////	c.anchor2.Write( f );
	////	f.WriteFloatString( "\n" );
	////	f.WriteFloatString( "\tfriction %f\n", c.friction );
	////	f.WriteFloatString( "\tstretch %f\n", c.stretch );
	////	f.WriteFloatString( "\tcompress %f\n", c.compress );
	////	f.WriteFloatString( "\tdamping %f\n", c.damping );
	////	f.WriteFloatString( "\trestLength %f\n", c.restLength );
	////	f.WriteFloatString( "\tminLength %f\n", c.minLength );
	////	f.WriteFloatString( "\tmaxLength %f\n", c.maxLength );
	////	f.WriteFloatString( "}\n" );
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::WriteConstraint
	////================
	////*/
	////bool idDeclAF::WriteConstraint( idFile *f, const idDeclAF_Constraint &c ) const {
	////	switch( c.type ) {
	////		case declAFConstraintType_t.DECLAF_CONSTRAINT_FIXED:
	////			return WriteFixed( f, c );
	////		case declAFConstraintType_t.DECLAF_CONSTRAINT_BALLANDSOCKETJOINT:
	////			return WriteBallAndSocketJoint( f, c );
	////		case declAFConstraintType_t.DECLAF_CONSTRAINT_UNIVERSALJOINT:
	////			return WriteUniversalJoint( f, c );
	////		case declAFConstraintType_t.DECLAF_CONSTRAINT_HINGE:
	////			return WriteHinge( f, c );
	////		case declAFConstraintType_t.DECLAF_CONSTRAINT_SLIDER:
	////			return WriteSlider( f, c );
	////		case declAFConstraintType_t.DECLAF_CONSTRAINT_SPRING:
	////			return WriteSpring( f, c );
	////		default:
	////			break;
	////	}
	////	return false;
	////}
	////
	/////*
	////================
	////idDeclAF::WriteSettings
	////================
	////*/
	////bool idDeclAF::WriteSettings( idFile *f ) const {
	////	var str = new idStr;
	////
	////	f.WriteFloatString( "\nsettings {\n" );
	////	f.WriteFloatString( "\tmodel \"%s\"\n", model.c_str() );
	////	f.WriteFloatString( "\tskin \"%s\"\n",	skin.c_str() );
	////	f.WriteFloatString( "\tfriction %f, %f, %f, %f\n", defaultLinearFriction, defaultAngularFriction, defaultContactFriction, defaultConstraintFriction );
	////	f.WriteFloatString( "\tsuspendSpeed %f, %f, %f, %f\n", suspendVelocity[0], suspendVelocity[1], suspendAcceleration[0], suspendAcceleration[1] );
	////	f.WriteFloatString( "\tnoMoveTime %f\n", noMoveTime );
	////	f.WriteFloatString( "\tnoMoveTranslation %f\n", noMoveTranslation );
	////	f.WriteFloatString( "\tnoMoveRotation %f\n", noMoveRotation );
	////	f.WriteFloatString( "\tminMoveTime %f\n", minMoveTime );
	////	f.WriteFloatString( "\tmaxMoveTime %f\n", maxMoveTime );
	////	f.WriteFloatString( "\ttotalMass %f\n", totalMass );
	////	f.WriteFloatString( "\tcontents %s\n", ContentsToString( contents, str ) );
	////	f.WriteFloatString( "\tclipMask %s\n", ContentsToString( clipMask, str ) );
	////	f.WriteFloatString( "\tselfCollision %d\n", selfCollision );
	////	f.WriteFloatString( "}\n" );
	////	return true;
	////}
	////
	////
	/////*
	////================
	////idDeclAF::RebuildTextSource
	////================
	////*/
	////bool idDeclAF::RebuildTextSource( ) {
	////	var/*int*/i:number;
	////	idFile_Memory f;
	////
	////	f.WriteFloatString("\n\n/*\n"
	////						"\tGenerated by the Articulated Figure Editor.\n"
	////						"\tDo not edit directly but launch the game and type 'editAFs' on the console.\n"
	////						"*/\n" );
	////
	////	f.WriteFloatString( "\narticulatedFigure %s {\n", this.GetName() );
	////
	////	if ( !WriteSettings( &f ) ) {
	////		return false;
	////	}
	////
	////	for ( i = 0; i < this.bodies.Num(); i++ ) {
	////		if ( !WriteBody( &f, *this.bodies[i] ) ) {
	////			return false;
	////		}
	////	}
	////
	////	for ( i = 0; i < this.constraints.Num(); i++ ) {
	////		if ( !WriteConstraint( &f, *this.constraints[i] ) ) {
	////			return false;
	////		}
	////	}
	////
	////	f.WriteFloatString( "\n}" );
	////
	////	SetText( f.GetDataPtr() );
	////
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::Save
	////================
	////*/
	////bool idDeclAF::Save( ) {
	////	RebuildTextSource();
	////	ReplaceSourceFileText();
	////	modified = false;
	////	return true;
	////}
	
	/*
	================
	idDeclAF::ContentsFromString
	================
	*/
	ContentsFromString ( str: string ): number {
		var /*int */c: number;
		var token = new idToken;
		var src = new idLexer( str, idStr.Length( str ), "idDeclAF::ContentsFromString" );

		c = 0;
		while ( src.ReadToken( token ) ) {
			if ( token.Icmp( "none" ) == 0 ) {
				c = 0;
			} else if ( token.Icmp( "solid" ) == 0 ) {
				c |= contentsFlags_t.CONTENTS_SOLID;
			} else if ( token.Icmp( "body" ) == 0 ) {
				c |= contentsFlags_t.CONTENTS_BODY;
			} else if ( token.Icmp( "corpse" ) == 0 ) {
				c |= contentsFlags_t.CONTENTS_CORPSE;
			} else if ( token.Icmp( "playerclip" ) == 0 ) {
				c |= contentsFlags_t.CONTENTS_PLAYERCLIP;
			} else if ( token.Icmp( "monsterclip" ) == 0 ) {
				c |= contentsFlags_t.CONTENTS_MONSTERCLIP;
			} else if ( token.data == "," ) {
				continue;
			} else {
				return c;
			}
		}
		return c;
	}

	/////*
	////================
	////idDeclAF::ContentsToString
	////================
	////*/
	////const char *idDeclAF::ContentsToString( const int contents, idStr &str ) {
	////	str = "";
	////	if ( contents & contentsFlags_t.CONTENTS_SOLID ) {
	////		if ( str.Length() ) str += ", ";
	////		str += "solid";
	////	}
	////	if ( contents & contentsFlags_t.CONTENTS_BODY ) {
	////		if ( str.Length() ) str += ", ";
	////		str += "body";
	////	}
	////	if ( contents & contentsFlags_t.CONTENTS_CORPSE ) {
	////		if ( str.Length() ) str += ", ";
	////		str += "corpse";
	////	}
	////	if ( contents & contentsFlags_t.CONTENTS_PLAYERCLIP ) {
	////		if ( str.Length() ) str += ", ";
	////		str += "playerclip";
	////	}
	////	if ( contents & contentsFlags_t.CONTENTS_MONSTERCLIP ) {
	////		if ( str.Length() ) str += ", ";
	////		str += "monsterclip";
	////	}
	////	if ( str[0] == '\0' ) {
	////		str = "none";
	////	}
	////	return str.c_str();
	////}
	////
	/*
	================
	idDeclAF::JointModFromString
	================
	*/
	JointModFromString ( str: string ): declAFJointMod_t {
		if ( idStr.Icmp( str, "orientation" ) == 0 ) {
			return declAFJointMod_t.DECLAF_JOINTMOD_AXIS;
		}
		if ( idStr.Icmp( str, "position" ) == 0 ) {
			return declAFJointMod_t.DECLAF_JOINTMOD_ORIGIN;
		}
		if ( idStr.Icmp( str, "both" ) == 0 ) {
			return declAFJointMod_t.DECLAF_JOINTMOD_BOTH;
		}
		return declAFJointMod_t.DECLAF_JOINTMOD_AXIS;
	}

	/////*
	////================
	////idDeclAF::JointModToString
	////================
	////*/
	////const char * idDeclAF::JointModToString( declAFJointMod_t jointMod ) {
	////	switch( jointMod ) {
	////		case declAFJointMod_t.DECLAF_JOINTMOD_AXIS: {
	////			return "orientation";
	////		}
	////		case declAFJointMod_t.DECLAF_JOINTMOD_ORIGIN: {
	////			return "position";
	////		}
	////		case declAFJointMod_t.DECLAF_JOINTMOD_BOTH: {
	////			return "both";
	////		}
	////	}
	////	return "orientation";
	////}
	////
	/////*
	////=================
	////idDeclAF::Size
	////=================
	////*/
	////size_t idDeclAF::Size( ) const {
	////	return sizeof( idDeclAF );
	////}
	////
	/*
	================
	idDeclAF::ParseContents
	================
	*/
	ParseContents ( src: idLexer, /*int */c: R<number>): boolean {
		var token = new idToken;
		var str = new idStr;

		while ( src.ReadToken( token ) ) {
			str.Append( token.data );
			if ( !src.CheckTokenString( "," ) ) {
				break;
			}
			str.Append( "," );
		}
		c.$ = this.ContentsFromString( str.data );
		return true;
	}

	/*
	================
	idDeclAF::ParseBody
	================
	*/
	ParseBody ( src: idLexer ): boolean {
		var hasJoint = false;
		var token = new idToken;
		var angles = new idAFVector;
		var body = new idDeclAF_Body;

		this.bodies.Alloc ( ) = body;

		body.SetDefault( this );

		if ( !src.ExpectTokenType( TT_STRING, 0, token ) ||
			!src.ExpectTokenString( "{" ) ) {
			return false;
		}

		body.name = token;
		if ( !body.name.Icmp( "origin" ) || !body.name.Icmp( "world" ) ) {
			src.Error( "a body may not be named \"origin\" or \"world\"" );
			return false;
		}

		while ( src.ReadToken( token ) ) {

			if ( !token.Icmp( "model" ) ) {
				if ( !src.ExpectTokenType( TT_NAME, 0, token ) ) {
					return false;
				}
				if ( !token.Icmp( "box" ) ) {
					body.modelType = traceModel_t.TRM_BOX;
					if ( !src.ExpectTokenString( "(" ) ||
						!body.v1.Parse( src ) ||
						!src.ExpectTokenString( "," ) ||
						!body.v2.Parse( src ) ||
						!src.ExpectTokenString( ")" ) ) {
						return false;
					}
				} else if ( !token.Icmp( "octahedron" ) ) {
					body.modelType = traceModel_t.TRM_OCTAHEDRON;
					if ( !src.ExpectTokenString( "(" ) ||
						!body.v1.Parse( src ) ||
						!src.ExpectTokenString( "," ) ||
						!body.v2.Parse( src ) ||
						!src.ExpectTokenString( ")" ) ) {
						return false;
					}
				} else if ( !token.Icmp( "dodecahedron" ) ) {
					body.modelType = traceModel_t.TRM_DODECAHEDRON;
					if ( !src.ExpectTokenString( "(" ) ||
						!body.v1.Parse( src ) ||
						!src.ExpectTokenString( "," ) ||
						!body.v2.Parse( src ) ||
						!src.ExpectTokenString( ")" ) ) {
						return false;
					}
				} else if ( !token.Icmp( "cylinder" ) ) {
					body.modelType = traceModel_t.TRM_CYLINDER;
					if ( !src.ExpectTokenString( "(" ) ||
						!body.v1.Parse( src ) ||
						!src.ExpectTokenString( "," ) ||
						!body.v2.Parse( src ) ||
						!src.ExpectTokenString( "," ) ) {
						return false;
					}
					body.numSides = src.ParseInt ( );
					if ( !src.ExpectTokenString( ")" ) ) {
						return false;
					}
				} else if ( !token.Icmp( "cone" ) ) {
					body.modelType = traceModel_t.TRM_CONE;
					if ( !src.ExpectTokenString( "(" ) ||
						!body.v1.Parse( src ) ||
						!src.ExpectTokenString( "," ) ||
						!body.v2.Parse( src ) ||
						!src.ExpectTokenString( "," ) ) {
						return false;
					}
					body.numSides = src.ParseInt ( );
					if ( !src.ExpectTokenString( ")" ) ) {
						return false;
					}
				} else if ( !token.Icmp( "bone" ) ) {
					body.modelType = traceModel_t.TRM_BONE;
					if ( !src.ExpectTokenString( "(" ) ||
						!body.v1.Parse( src ) ||
						!src.ExpectTokenString( "," ) ||
						!body.v2.Parse( src ) ||
						!src.ExpectTokenString( "," ) ) {
						return false;
					}
					body.width = src.ParseFloat ( );
					if ( !src.ExpectTokenString( ")" ) ) {
						return false;
					}
				} else if ( !token.Icmp( "custom" ) ) {
					src.Error( "custom models not yet implemented" );
					return false;
				} else {
					src.Error( "unkown model type %s", token.c_str ( ) );
					return false;
				}
			} else if ( !token.Icmp( "origin" ) ) {
				if ( !body.origin.Parse( src ) ) {
					return false;
				}
			} else if ( !token.Icmp( "angles" ) ) {
				if ( !angles.Parse( src ) ) {
					return false;
				}
				body.angles.opEquals( new idAngles( angles.ToVec3 ( ).x, angles.ToVec3 ( ).y, angles.ToVec3 ( ).z ) );
			} else if ( !token.Icmp( "joint" ) ) {
				if ( !src.ExpectTokenType( TT_STRING, 0, token ) ) {
					return false;
				}
				body.jointName = token;
				hasJoint = true;
			} else if ( !token.Icmp( "mod" ) ) {
				if ( !src.ExpectAnyToken( token ) ) {
					return false;
				}
				body.jointMod = this.JointModFromString( token.c_str ( ) );
			} else if ( !token.Icmp( "density" ) ) {
				body.density = src.ParseFloat ( );
			} else if ( !token.Icmp( "inertiaScale" ) ) {
				src.Parse1DMatrix( 9, body.inertiaScale[0].ToFloatPtr ( ) );
			} else if ( !token.Icmp( "friction" ) ) {
				body.linearFriction = src.ParseFloat ( );
				src.ExpectTokenString( "," );
				body.angularFriction = src.ParseFloat ( );
				src.ExpectTokenString( "," );
				body.contactFriction = src.ParseFloat ( );
			} else if ( !token.Icmp( "contents" ) ) {
				var $contents = new R( body.contents );
				this.ParseContents( src, $contents );
				body.contents = $contents.$;
			} else if ( !token.Icmp( "clipMask" ) ) {
				var $clipMask = new R( body.clipMask );
				this.ParseContents( src, $clipMask );
				body.clipMask = $clipMask.$;
			} else if ( !token.Icmp( "selfCollision" ) ) {
				body.selfCollision = src.ParseBool ( );
			} else if ( !token.Icmp( "containedjoints" ) ) {
				if ( !src.ExpectTokenType( TT_STRING, 0, token ) ) {
					return false;
				}
				body.containedJoints = token;
			} else if ( !token.Icmp( "frictionDirection" ) ) {
				if ( !body.frictionDirection.Parse( src ) ) {
					return false;
				}
			} else if ( !token.Icmp( "contactMotorDirection" ) ) {
				if ( !body.contactMotorDirection.Parse( src ) ) {
					return false;
				}
			} else if ( token.data == "}" ) {
				break;
			} else {
				src.Error( "unknown token %s in body", token.c_str ( ) );
				return false;
			}
		}

		if ( body.modelType == traceModel_t.TRM_INVALID ) {
			src.Error( "no model set for body" );
			return false;
		}

		if ( !hasJoint ) {
			src.Error( "no joint set for body" );
			return false;
		}

		body.clipMask |= contentsFlags_t.CONTENTS_MOVEABLECLIP;

		return true;
	}

/*
	================
	idDeclAF::ParseFixed
	================
	*/
	ParseFixed ( src: idLexer ): boolean {
		var token = new idToken;
		var constraint: idDeclAF_Constraint = new idDeclAF_Constraint;

		constraint.SetDefault( this );
		this.constraints.Alloc ( ) = constraint;

		if ( !src.ExpectTokenType( TT_STRING, 0, token ) ||
			!src.ExpectTokenString( "{" ) ) {
			return false;
		}

		constraint.type = declAFConstraintType_t.DECLAF_CONSTRAINT_FIXED;
		constraint.name = token;

		while ( src.ReadToken( token ) ) {

			if ( !token.Icmp( "body1" ) ) {
				src.ExpectTokenType( TT_STRING, 0, token );
				constraint.body1 = token;
			} else if ( !token.Icmp( "body2" ) ) {
				src.ExpectTokenType( TT_STRING, 0, token );
				constraint.body2 = token;
			} else if ( token.data == "}" ) {
				break;
			} else {
				src.Error( "unknown token %s in ball and socket joint", token.c_str ( ) );
				return false;
			}
		}

		return true;
	}

	/////*
	////================
	////idDeclAF::ParseBallAndSocketJoint
	////================
	////*/
	////bool idDeclAF::ParseBallAndSocketJoint( idLexer &src ) {
	////	var token = new idToken;
	////	idDeclAF_Constraint *constraint = new idDeclAF_Constraint;
	////
	////	constraint.SetDefault( this );
	////	this.constraints.Alloc() = constraint;
	////
	////	if ( !src.ExpectTokenType( TT_STRING, 0, token ) ||
	////			!src.ExpectTokenString( "{" ) ) {
	////		return false;
	////	}
	////
	////	constraint.type = declAFConstraintType_t.DECLAF_CONSTRAINT_BALLANDSOCKETJOINT;
	////	constraint.limit = idDeclAF_Constraint::LIMIT_NONE;
	////	constraint.name = token;
	////	constraint.friction = 0.5;
	////	constraint.anchor.ToVec3().Zero();
	////	constraint.shaft[0].ToVec3().Zero();
	////
	////	while( src.ReadToken( token ) ) {
	////
	////		if ( !token.Icmp( "body1" ) ) {
	////			src.ExpectTokenType( TT_STRING, 0, token );
	////			constraint.body1 = token;
	////		} else if ( !token.Icmp( "body2" ) ) {
	////			src.ExpectTokenType( TT_STRING, 0, token );
	////			constraint.body2 = token;
	////		} else if ( !token.Icmp( "anchor" ) ) {
	////			if ( !constraint.anchor.Parse( src ) ) {
	////				return false;
	////			}
	////		} else if ( !token.Icmp( "conelimit" ) ) {
	////			if ( !constraint.limitAxis.Parse( src ) ||
	////				!src.ExpectTokenString( "," ) ) {
	////					return false;
	////			}
	////			constraint.limitAngles[0] = src.ParseFloat();
	////			if ( !src.ExpectTokenString( "," ) ||
	////				!constraint.shaft[0].Parse( src ) ) {
	////				return false;
	////			}
	////			constraint.limit = idDeclAF_Constraint::LIMIT_CONE;
	////		} else if ( !token.Icmp( "pyramidlimit" ) ) {
	////			if ( !constraint.limitAxis.Parse( src ) ||
	////				!src.ExpectTokenString( "," ) ) {
	////					return false;
	////			}
	////			constraint.limitAngles[0] = src.ParseFloat();
	////			if ( !src.ExpectTokenString( "," ) ) {
	////				return false;
	////			}
	////			constraint.limitAngles[1] = src.ParseFloat();
	////			if ( !src.ExpectTokenString( "," ) ) {
	////				return false;
	////			}
	////			constraint.limitAngles[2] = src.ParseFloat();
	////			if ( !src.ExpectTokenString( "," ) ||
	////				!constraint.shaft[0].Parse( src ) ) {
	////				return false;
	////			}
	////			constraint.limit = idDeclAF_Constraint::LIMIT_PYRAMID;
	////		} else if ( !token.Icmp( "friction" ) ) {
	////			constraint.friction = src.ParseFloat();
	////		} else if ( token == "}" ) {
	////			break;
	////		} else {
	////			src.Error( "unknown token %s in ball and socket joint", token.c_str() );
	////			return false;
	////		}
	////	}
	////
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::ParseUniversalJoint
	////================
	////*/
	////bool idDeclAF::ParseUniversalJoint( idLexer &src ) {
	////	var token = new idToken;
	////	idDeclAF_Constraint *constraint = new idDeclAF_Constraint;
	////
	////	constraint.SetDefault( this );
	////	this.constraints.Alloc() = constraint;
	////
	////	if ( !src.ExpectTokenType( TT_STRING, 0, token ) ||
	////			!src.ExpectTokenString( "{" ) ) {
	////		return false;
	////	}
	////
	////	constraint.type = declAFConstraintType_t.DECLAF_CONSTRAINT_UNIVERSALJOINT;
	////	constraint.limit = idDeclAF_Constraint::LIMIT_NONE;
	////	constraint.name = token;
	////	constraint.friction = 0.5;
	////	constraint.anchor.ToVec3().Zero();
	////	constraint.shaft[0].ToVec3().Zero();
	////	constraint.shaft[1].ToVec3().Zero();
	////
	////	while( src.ReadToken( token ) ) {
	////
	////		if ( !token.Icmp( "body1" ) ) {
	////			src.ExpectTokenType( TT_STRING, 0, token );
	////			constraint.body1 = token;
	////		} else if ( !token.Icmp( "body2" ) ) {
	////			src.ExpectTokenType( TT_STRING, 0, token );
	////			constraint.body2 = token;
	////		} else if ( !token.Icmp( "anchor" ) ) {
	////			if ( !constraint.anchor.Parse( src ) ) {
	////				return false;
	////			}
	////		} else if ( !token.Icmp( "shafts" ) ) {
	////			if ( !constraint.shaft[0].Parse( src ) ||
	////					!src.ExpectTokenString( "," ) ||
	////					!constraint.shaft[1].Parse( src ) ) {
	////				return false;
	////			}
	////		} else if ( !token.Icmp( "conelimit" ) ) {
	////			if ( !constraint.limitAxis.Parse( src ) ||
	////				!src.ExpectTokenString( "," ) ) {
	////					return false;
	////			}
	////			constraint.limitAngles[0] = src.ParseFloat();
	////			constraint.limit = idDeclAF_Constraint::LIMIT_CONE;
	////		} else if ( !token.Icmp( "pyramidlimit" ) ) {
	////			if ( !constraint.limitAxis.Parse( src ) ||
	////				!src.ExpectTokenString( "," ) ) {
	////					return false;
	////			}
	////			constraint.limitAngles[0] = src.ParseFloat();
	////			if ( !src.ExpectTokenString( "," ) ) {
	////				return false;
	////			}
	////			constraint.limitAngles[1] = src.ParseFloat();
	////			if ( !src.ExpectTokenString( "," ) ) {
	////				return false;
	////			}
	////			constraint.limitAngles[2] = src.ParseFloat();
	////			constraint.limit = idDeclAF_Constraint::LIMIT_PYRAMID;
	////		} else if ( !token.Icmp( "friction" ) ) {
	////			constraint.friction = src.ParseFloat();
	////		} else if ( token == "}" ) {
	////			break;
	////		} else {
	////			src.Error( "unknown token %s in universal joint", token.c_str() );
	////			return false;
	////		}
	////	}
	////
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::ParseHinge
	////================
	////*/
	////bool idDeclAF::ParseHinge( idLexer &src ) {
	////	var token = new idToken;
	////	idDeclAF_Constraint *constraint = new idDeclAF_Constraint;
	////
	////	constraint.SetDefault( this );
	////	this.constraints.Alloc() = constraint;
	////
	////	if ( !src.ExpectTokenType( TT_STRING, 0, token ) ||
	////			!src.ExpectTokenString( "{" ) ) {
	////		return false;
	////	}
	////
	////	constraint.type = declAFConstraintType_t.DECLAF_CONSTRAINT_HINGE;
	////	constraint.limit = idDeclAF_Constraint::LIMIT_NONE;
	////	constraint.name = token;
	////	constraint.friction = 0.5;
	////	constraint.anchor.ToVec3().Zero();
	////	constraint.axis.ToVec3().Zero();
	////
	////	while( src.ReadToken( token ) ) {
	////
	////		if ( !token.Icmp( "body1" ) ) {
	////			src.ExpectTokenType( TT_STRING, 0, token );
	////			constraint.body1 = token;
	////		} else if ( !token.Icmp( "body2" ) ) {
	////			src.ExpectTokenType( TT_STRING, 0, token );
	////			constraint.body2 = token;
	////		} else if ( !token.Icmp( "anchor" ) ) {
	////			if ( !constraint.anchor.Parse( src ) ) {
	////				return false;
	////			}
	////		} else if ( !token.Icmp( "axis" ) ) {
	////			if ( !constraint.axis.Parse( src ) ) {
	////				return false;
	////			}
	////		} else if ( !token.Icmp( "limit" ) ) {
	////			constraint.limitAngles[0] = src.ParseFloat();
	////			if ( !src.ExpectTokenString( "," ) ) {
	////				return false;
	////			}
	////			constraint.limitAngles[1] = src.ParseFloat();
	////			if ( !src.ExpectTokenString( "," ) ) {
	////				return false;
	////			}
	////			constraint.limitAngles[2] = src.ParseFloat();
	////			constraint.limit = idDeclAF_Constraint::LIMIT_CONE;
	////		} else if ( !token.Icmp( "friction" ) ) {
	////			constraint.friction = src.ParseFloat();
	////		} else if ( token == "}" ) {
	////			break;
	////		} else {
	////			src.Error( "unknown token %s in hinge", token.c_str() );
	////			return false;
	////		}
	////	}
	////
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::ParseSlider
	////================
	////*/
	////bool idDeclAF::ParseSlider( idLexer &src ) {
	////	var token = new idToken;
	////	idDeclAF_Constraint *constraint = new idDeclAF_Constraint;
	////
	////	constraint.SetDefault( this );
	////	this.constraints.Alloc() = constraint;
	////
	////	if ( !src.ExpectTokenType( TT_STRING, 0, token ) ||
	////			!src.ExpectTokenString( "{" ) ) {
	////		return false;
	////	}
	////
	////	constraint.type = declAFConstraintType_t.DECLAF_CONSTRAINT_SLIDER;
	////	constraint.limit = idDeclAF_Constraint::LIMIT_NONE;
	////	constraint.name = token;
	////	constraint.friction = 0.5;
	////
	////	while( src.ReadToken( token ) ) {
	////
	////		if ( !token.Icmp( "body1" ) ) {
	////			src.ExpectTokenType( TT_STRING, 0, token );
	////			constraint.body1 = token;
	////		} else if ( !token.Icmp( "body2" ) ) {
	////			src.ExpectTokenType( TT_STRING, 0, token );
	////			constraint.body2 = token;
	////		} else if ( !token.Icmp( "axis" ) ) {
	////			if ( !constraint.axis.Parse( src ) ) {
	////				return false;
	////			}
	////		} else if ( !token.Icmp( "friction" ) ) {
	////			constraint.friction = src.ParseFloat();
	////		} else if ( token == "}" ) {
	////			break;
	////		} else {
	////			src.Error( "unknown token %s in slider", token.c_str() );
	////			return false;
	////		}
	////	}
	////
	////	return true;
	////}
	////
	/////*
	////================
	////idDeclAF::ParseSpring
	////================
	////*/
	////bool idDeclAF::ParseSpring( idLexer &src ) {
	////	var token = new idToken;
	////	idDeclAF_Constraint *constraint = new idDeclAF_Constraint;
	////
	////	constraint.SetDefault( this );
	////	this.constraints.Alloc() = constraint;
	////
	////	if ( !src.ExpectTokenType( TT_STRING, 0, token ) ||
	////			!src.ExpectTokenString( "{" ) ) {
	////		return false;
	////	}
	////
	////	constraint.type = declAFConstraintType_t.DECLAF_CONSTRAINT_SPRING;
	////	constraint.limit = idDeclAF_Constraint::LIMIT_NONE;
	////	constraint.name = token;
	////	constraint.friction = 0.5;
	////
	////	while( src.ReadToken( token ) ) {
	////
	////		if ( !token.Icmp( "body1" ) ) {
	////			src.ExpectTokenType( TT_STRING, 0, token );
	////			constraint.body1 = token;
	////		} else if ( !token.Icmp( "body2" ) ) {
	////			src.ExpectTokenType( TT_STRING, 0, token );
	////			constraint.body2 = token;
	////		} else if ( !token.Icmp( "anchor1" ) ) {
	////			if ( !constraint.anchor.Parse( src ) ) {
	////				return false;
	////			}
	////		} else if ( !token.Icmp( "anchor2" ) ) {
	////			if ( !constraint.anchor2.Parse( src ) ) {
	////				return false;
	////			}
	////		} else if ( !token.Icmp( "friction" ) ) {
	////			constraint.friction = src.ParseFloat();
	////		} else if ( !token.Icmp( "stretch" ) ) {
	////			constraint.stretch = src.ParseFloat();
	////		} else if ( !token.Icmp( "compress" ) ) {
	////			constraint.compress = src.ParseFloat();
	////		} else if ( !token.Icmp( "damping" ) ) {
	////			constraint.damping = src.ParseFloat();
	////		} else if ( !token.Icmp( "restLength" ) ) {
	////			constraint.restLength = src.ParseFloat();
	////		} else if ( !token.Icmp( "minLength" ) ) {
	////			constraint.minLength = src.ParseFloat();
	////		} else if ( !token.Icmp( "maxLength" ) ) {
	////			constraint.maxLength = src.ParseFloat();
	////		} else if ( token == "}" ) {
	////			break;
	////		} else {
	////			src.Error( "unknown token %s in spring", token.c_str() );
	////			return false;
	////		}
	////	}
	////
	////	return true;
	////}
	
	/*
	================
	idDeclAF::ParseSettings
	================
	*/
	ParseSettings ( src: idLexer ): boolean {
		var token = new idToken;

		if ( !src.ExpectTokenString( "{" ) ) {
			return false;
		}

		while ( src.ReadToken( token ) ) {

			if ( !token.Icmp( "mesh" ) ) {
				if ( !src.ExpectTokenType( TT_STRING, 0, token ) ) {
					return false;
				}
			} else if ( !token.Icmp( "anim" ) ) {
				if ( !src.ExpectTokenType( TT_STRING, 0, token ) ) {
					return false;
				}
			} else if ( !token.Icmp( "model" ) ) {
				if ( !src.ExpectTokenType( TT_STRING, 0, token ) ) {
					return false;
				}
				this.model.opEquals( token );
			} else if ( !token.Icmp( "skin" ) ) {
				if ( !src.ExpectTokenType( TT_STRING, 0, token ) ) {
					return false;
				}
				this.skin.opEquals( token );
			} else if ( !token.Icmp( "friction" ) ) {

				this.defaultLinearFriction = src.ParseFloat ( );
				if ( !src.ExpectTokenString( "," ) ) {
					return false;
				}
				this.defaultAngularFriction = src.ParseFloat ( );
				if ( !src.ExpectTokenString( "," ) ) {
					return false;
				}
				this.defaultContactFriction = src.ParseFloat ( );
				if ( src.CheckTokenString( "," ) ) {
					this.defaultConstraintFriction = src.ParseFloat ( );
				}
			} else if ( !token.Icmp( "totalMass" ) ) {
				this.totalMass = src.ParseFloat ( );
			} else if ( !token.Icmp( "suspendSpeed" ) ) {

				this.suspendVelocity[0] = src.ParseFloat ( );
				if ( !src.ExpectTokenString( "," ) ) {
					return false;
				}
				this.suspendVelocity[1] = src.ParseFloat ( );
				if ( !src.ExpectTokenString( "," ) ) {
					return false;
				}
				this.suspendAcceleration[0] = src.ParseFloat ( );
				if ( !src.ExpectTokenString( "," ) ) {
					return false;
				}
				this.suspendAcceleration[1] = src.ParseFloat ( );
			} else if ( !token.Icmp( "noMoveTime" ) ) {
				this.noMoveTime = src.ParseFloat ( );
			} else if ( !token.Icmp( "noMoveTranslation" ) ) {
				this.noMoveTranslation = src.ParseFloat ( );
			} else if ( !token.Icmp( "noMoveRotation" ) ) {
				this.noMoveRotation = src.ParseFloat ( );
			} else if ( !token.Icmp( "minMoveTime" ) ) {
				this.minMoveTime = src.ParseFloat ( );
			} else if ( !token.Icmp( "maxMoveTime" ) ) {
				this.maxMoveTime = src.ParseFloat ( );
			} else if (!token.Icmp("contents")) {
				var $contents = new R( this.contents );
				this.ParseContents(src, $contents);
				this.contents = $contents.$;
			} else if (!token.Icmp("clipMask")) {
				var $clipMask = new R( this.clipMask );
				this.ParseContents(src, $clipMask);
				this.clipMask = $clipMask.$;
			} else if ( !token.Icmp( "selfCollision" ) ) {
				this.selfCollision = src.ParseBool ( );
			} else if ( token.data == "}" ) {
				break;
			} else {
				src.Error( "unknown token %s in settings", token.c_str ( ) );
				return false;
			}
		}

		return true;
	}

	/*
	================
	idDeclAF::Parse
	================
	*/
	Parse ( text: string, /*int */textLength: number ): boolean {
		var /*int */i: number, j: number;
		var src = new idLexer;
		var token = new idToken;

		src.LoadMemory( text, textLength, this.GetFileName ( ), this.GetLineNum ( ) );
		src.SetFlags( DECL_LEXER_FLAGS );
		src.SkipUntilString( "{" );

		while ( src.ReadToken( token ) ) {

			if ( !token.Icmp( "settings" ) ) {
				if ( !this.ParseSettings( src ) ) {
					return false;
				}
			} else if ( !token.Icmp( "body" ) ) {
				if ( !this.ParseBody( src ) ) {
					return false;
				}
			} else if ( !token.Icmp( "fixed" ) ) {
				if ( !this.ParseFixed( src ) ) {
					return false;
				}
			} else if ( !token.Icmp( "ballAndSocketJoint" ) ) {
				if ( !this.ParseBallAndSocketJoint( src ) ) {
					return false;
				}
			} else if ( !token.Icmp( "universalJoint" ) ) {
				if ( !this.ParseUniversalJoint( src ) ) {
					return false;
				}
			} else if ( !token.Icmp( "hinge" ) ) {
				if ( !this.ParseHinge( src ) ) {
					return false;
				}
			} else if ( !token.Icmp( "slider" ) ) {
				if ( !this.ParseSlider( src ) ) {
					return false;
				}
			} else if ( !token.Icmp( "spring" ) ) {
				if ( !this.ParseSpring( src ) ) {
					return false;
				}
			} else if ( token.data == "}" ) {
				break;
			} else {
				src.Error( "unknown keyword %s", token.c_str ( ) );
				return false;
			}
		}

		for ( i = 0; i < this.bodies.Num ( ); i++ ) {
			// check for multiple bodies with the same name
			for ( j = i + 1; j < this.bodies.Num ( ); j++ ) {
				if ( this.bodies[i].name == this.bodies[j].name ) {
					src.Error( "two bodies with the same name \"%s\"", this.bodies[i].name.c_str ( ) );
				}
			}
		}

		for ( i = 0; i < this.constraints.Num ( ); i++ ) {
			// check for multiple constraints with the same name
			for ( j = i + 1; j < this.constraints.Num ( ); j++ ) {
				if ( this.constraints[i].name == this.constraints[j].name ) {
					src.Error( "two constraints with the same name \"%s\"", this.constraints[i].name.c_str ( ) );
				}
			}
			// check if there are two valid bodies set
			if ( this.constraints[i].body1.data == "" ) {
				src.Error( "no valid body1 specified for constraint '%s'", this.constraints[i].name.c_str ( ) );
			}
			if ( this.constraints[i].body2.data == "" ) {
				src.Error( "no valid body2 specified for constraint '%s'", this.constraints[i].name.c_str ( ) );
			}
		}

		// make sure the body which modifies the origin comes first
		for ( i = 0; i < this.bodies.Num ( ); i++ ) {
			if ( this.bodies[i].jointName.data == "origin" ) {
				if ( i != 0 ) {
					var b: idDeclAF_Body = this.bodies[0];
					this.bodies[0] = this.bodies[i];
					this.bodies[i] = b;
				}
				break;
			}
		}

		return true;
	}

	/*
	================
	idDeclAF::DefaultDefinition
	================
	*/
	DefaultDefinition(): string {
		return "{\n" +
			"\t" + "settings {\n" +
			"\t\t" + "model \"\"\n" +
			"\t\t" + "skin \"\"\n" +
			"\t\t" + "friction 0.01, 0.01, 0.8, 0.5\n" +
			"\t\t" + "suspendSpeed 20, 30, 40, 60\n" +
			"\t\t" + "noMoveTime 1\n" +
			"\t\t" + "noMoveTranslation 10\n" +
			"\t\t" + "noMoveRotation 10\n" +
			"\t\t" + "minMoveTime -1\n" +
			"\t\t" + "maxMoveTime -1\n" +
			"\t\t" + "totalMass -1\n" +
			"\t\t" + "contents corpse\n" +
			"\t\t" + "clipMask solid, corpse\n" +
			"\t\t" + "selfCollision 1\n" +
			"\t" + "}\n" +
			"\t" + "body \"body\" {\n" +
			"\t\t" + "joint \"origin\"\n" +
			"\t\t" + "mod orientation\n" +
			"\t\t" + "model box( ( -10, -10, -10 ), ( 10, 10, 10 ) )\n" +
			"\t\t" + "origin ( 0, 0, 0 )\n" +
			"\t\t" + "density 0.2\n" +
			"\t\t" + "friction 0.01, 0.01, 0.8\n" +
			"\t\t" + "contents corpse\n" +
			"\t\t" + "clipMask solid, corpse\n" +
			"\t\t" + "selfCollision 1\n" +
			"\t\t" + "containedJoints \"*origin\"\n" +
			"\t" + "}\n" +
			"}\n";
	}

/*
================
idDeclAF::FreeData
================
*/
	FreeData ( ): void {
		this.modified = false;
		this.defaultLinearFriction = 0.01;
		this.defaultAngularFriction = 0.01;
		this.defaultContactFriction = 0.8;
		this.defaultConstraintFriction = 0.5;
		this.totalMass = -1;
		this.suspendVelocity.Set( 20.0, 30.0 );
		this.suspendAcceleration.Set( 40.0, 60.0 );
		this.noMoveTime = 1.0;
		this.noMoveTranslation = 10.0;
		this.noMoveRotation = 10.0;
		this.minMoveTime = -1.0;
		this.maxMoveTime = -1.0;
		this.selfCollision = true;
		this.contents = contentsFlags_t.CONTENTS_CORPSE;
		this.clipMask = contentsFlags_t.CONTENTS_SOLID | contentsFlags_t.CONTENTS_CORPSE;
		this.bodies.DeleteContents( true );
		this.constraints.DeleteContents( true );
	}

/*
================
idDeclAF::Finish
================
*/
	Finish ( GetJointTransform: /*getJointTransform_t*/ ( model: any, frame: idJointMat[], jointName: string, origin: idVec3, axis: idMat3 ) => boolean, frame: idJointMat[], /*void **/model: any ): void {
		var /*int*/i: number;

		var name: string = this.GetName ( );
		for ( i = 0; i < this.bodies.Num ( ); i++ ) {
			var body: idDeclAF_Body = this.bodies[i];
			body.v1.Finish( name, GetJointTransform, frame, model );
			body.v2.Finish( name, GetJointTransform, frame, model );
			body.origin.Finish( name, GetJointTransform, frame, model );
			body.frictionDirection.Finish( name, GetJointTransform, frame, model );
			body.contactMotorDirection.Finish( name, GetJointTransform, frame, model );
		}
		for ( i = 0; i < this.constraints.Num ( ); i++ ) {
			var constraint: idDeclAF_Constraint = this.constraints[i];
			constraint.anchor.Finish( name, GetJointTransform, frame, model );
			constraint.anchor2.Finish( name, GetJointTransform, frame, model );
			constraint.shaft[0].Finish( name, GetJointTransform, frame, model );
			constraint.shaft[1].Finish( name, GetJointTransform, frame, model );
			constraint.axis.Finish( name, GetJointTransform, frame, model );
			constraint.limitAxis.Finish( name, GetJointTransform, frame, model );
		}
	}

/*
////================
////idDeclAF::NewBody
////================
////*/
////void idDeclAF::NewBody( name:string ) {
////	idDeclAF_Body *body;
////
////	body = new idDeclAF_Body();
////	body.SetDefault( this );
////	body.name = name;
////	this.bodies.Append( body );
////}
////
/////*
////================
////idDeclAF::RenameBody
////
////  rename the body with the given name and rename
////  all constraint body references
////================
////*/
////void idDeclAF::RenameBody( const char *oldName, const char *newName ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < this.bodies.Num(); i++ ) {
////		if ( this.bodies[i].name.Icmp( oldName ) == 0 ) {
////			this.bodies[i].name = newName;
////			break;
////		}
////	}
////	for ( i = 0; i < this.constraints.Num(); i++ ) {
////		if ( this.constraints[i].body1.Icmp( oldName ) == 0 ) {
////			this.constraints[i].body1 = newName;
////		} else if ( this.constraints[i].body2.Icmp( oldName ) == 0 ) {
////			this.constraints[i].body2 = newName;
////		}
////	}
////}
////
/////*
////================
////idDeclAF::DeleteBody
////
////  delete the body with the given name and delete
////  all this.constraints that reference the body
////================
////*/
////void idDeclAF::DeleteBody( name:string ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < this.bodies.Num(); i++ ) {
////		if ( this.bodies[i].name.Icmp( name ) == 0 ) {
////			delete this.bodies[i];
////			this.bodies.RemoveIndex( i );
////			break;
////		}
////	}
////	for ( i = 0; i < this.constraints.Num(); i++ ) {
////		if ( this.constraints[i].body1.Icmp( name ) == 0 ||
////			this.constraints[i].body2.Icmp( name ) == 0 ) {
////			delete this.constraints[i];
////			this.constraints.RemoveIndex( i );
////			i--;
////		}
////	}
////}
////
/////*
////================
////idDeclAF::NewConstraint
////================
////*/
////void idDeclAF::NewConstraint( name:string ) {
////	idDeclAF_Constraint *constraint;
////
////	constraint = new idDeclAF_Constraint;
////	constraint.SetDefault( this );
////	constraint.name = name;
////	this.constraints.Append( constraint );
////}
////
/////*
////================
////idDeclAF::RenameConstraint
////================
////*/
////void idDeclAF::RenameConstraint( const char *oldName, const char *newName ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < this.constraints.Num(); i++ ) {
////		if ( this.constraints[i].name.Icmp( oldName ) == 0 ) {
////			this.constraints[i].name = newName;
////			return;
////		}
////	}
////}
////
/////*
////================
////idDeclAF::DeleteConstraint
////================
////*/
////void idDeclAF::DeleteConstraint( name:string ) {
////	var/*int*/i:number;
////
////	for ( i = 0; i < this.constraints.Num(); i++ ) {
////		if ( this.constraints[i].name.Icmp( name ) == 0 ) {
////			delete this.constraints[i];
////			this.constraints.RemoveIndex( i );
////			return;
////		}
////	}
////}

/*
================
idDeclAF::idDeclAF
================
*/
	constructor() {
		super ( );
		this.FreeData ( );
	}
	
	/*
	================
	idDeclAF::~idDeclAF
	================
	*/
	destructor ( ): void {
		this.bodies.DeleteContents( true );
		this.constraints.DeleteContents( true );
	}
}
////
////#endif /* !__DECLAF_H__ */
