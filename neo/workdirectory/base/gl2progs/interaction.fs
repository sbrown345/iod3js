#version 120         
         
varying vec3     			var_Position; 
varying vec2            	var_TexDiffuse;        
varying vec2            	var_TexNormal;        
varying vec2            	var_TexSpecular;       
varying vec4            	var_TexLight; 
varying mat3				var_TangentBitangentNormalMatrix; 
varying vec4            	var_Color;        
     
uniform sampler2D   		u_normalTexture;         
uniform sampler2D   		u_lightFalloffTexture;         
uniform sampler2D   		u_lightProjectionTexture;         
uniform sampler2D   		u_diffuseTexture;         
uniform sampler2D   		u_specularTexture;        
         
uniform vec4 				u_lightOrigin;        
uniform vec4 				u_viewOrigin;        
uniform vec4 				u_diffuseColor;        
uniform vec4 				u_specularColor;        

/*
vec3 SchlickFresnel(vec3 H, vec3 V, float power, vec3 k) {   
	float w = pow(1 - max( dot( H, V ), 0), power);
	return mix(k, vec3(1,1,1), w);
}
*/

float SchlickFresnel(vec3 H, vec3 V, float power, float k) {   
	float w = pow(1 - max( dot( H, V ), 0), power);
	return w + (1.0-w)*k;
	//mix(k, 1, w);
}


// Ward isotropic specular term
float wardiso( vec3 L, vec3 V, vec3 N, vec3 H, float roughness) {
	float ndotv = dot( N, V);
	float ndoth = dot( N, H);
	float ndotl = dot( N, L);
	float tandelta		= tan( acos(ndoth));
	float powtandelta	= pow( tandelta, 2.0);
	float a				= clamp( (1.0 / sqrt( ndotl * ndotv )), 0, 1 );
	float powroughness	= pow( roughness, 2 );
	return max(exp( -( powtandelta / powroughness)) * a / (4 * powroughness), 0);
}

// Minnaert diffuse term
float Minnaert( vec3 N, vec3 L, float k) { 
	float ndotl = max(dot(N, L), 0);
	return pow(ndotl, k);
}

// lambertian blinn-phong
float Lambertian( vec3 N, vec3 L) {
	return max( dot( N, L ) , 0);
}

// half-lambertian blinn-phong
float HalfLambertian( vec3 N, vec3 L, float k) {
	float ndotl = (max(dot( N, L ), 0) + 0.50) / ( 1.0 + 0.5 );
	return pow(ndotl, k);
}

vec4 lightingModel( vec4 diffuseTerm, vec3 specularTerm, vec3 L, vec3 V, vec3 N, vec3 H ) {   
#if 1  
	float specularity	= length(specularTerm);
	float roughness		= (1 - specularity) - 0.25;
	
	vec3 R = reflect(-L, N); // same as: 2 * N * max(dot(N, L), 0) - L;	
	
	float diffuseIntensity	= HalfLambertian(N, L, 1.5);	
	float fresnelTerm		= SchlickFresnel(H, V, 4, specularity * 2);
	float specularIntensity = wardiso(L, V, N, H, roughness);
							  //pow(max(dot( R, V ), 0), 4);
							  //pow(max((dot( N, H ) - 0.75) * 4, 0), 2) * 2; // the doom3 approximation

	vec4 diffuseReflection  = max( diffuseTerm * diffuseIntensity , 0 );
	vec3 specularReflection = max( specularTerm * specularIntensity * fresnelTerm, 0 );
 
	return diffuseReflection + vec4(specularReflection.rgb, 1); 
#else 
	float diffuseIntensity  = Lambertian(N, L); 
	float specularIntensity = pow(max((dot( N, H ) - 0.75) * 4, 0), 2) * 2; // doom3 'adjusted' specular angle
 
	vec4 diffuseReflection  = max( diffuseTerm  * diffuseIntensity , 0 );
	vec3 specularReflection = max( specularTerm * specularIntensity, 0 );
 
	return diffuseReflection + vec4(specularReflection.rgb, 1); 
#endif 
} 

void main( void ) {
	vec3 lightDir	= u_lightOrigin.xyz - var_Position;
	vec3 viewDir	= u_viewOrigin.xyz - var_Position;

	// compute normalized light, view and half angle vectors 
	vec3 L = normalize( lightDir ); 
	vec3 V = normalize( viewDir ); 
	vec3 H = normalize( L + V ); 
 
	// compute normal from normal map, move from [0, 1] to [-1, 1] range, normalize 
	vec3 N = normalize( ( 2.0 * texture2D ( u_normalTexture, var_TexNormal.st ).wyz ) - 1.0 ); 
	N = var_TangentBitangentNormalMatrix * N; 
	
	// compute the diffuse term    
	vec4 diffuse = texture2D( u_diffuseTexture, var_TexDiffuse ) * u_diffuseColor; 

	// compute the specular term
	vec3 specular = texture2D( u_specularTexture, var_TexSpecular ).rgb * u_specularColor.rgb; 

	// compute light projection and falloff 
	vec3 lightFalloff		= texture2D( u_lightFalloffTexture, vec2( var_TexLight.z, 0.5 ) ).rgb;
	vec3 lightProjection	= texture2DProj( u_lightProjectionTexture, var_TexLight.xyw ).rgb; 

	// compute lighting model
    vec4 color = lightingModel(diffuse, specular, L, V, N, H );  
	color.rgb *= lightProjection; 
	color.rgb *= lightFalloff; 
	color.rgb *= var_Color.rgb; 
 
	// output final color     
	gl_FragColor = color;        
}