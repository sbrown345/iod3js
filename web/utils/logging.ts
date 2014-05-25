/*
===============================================================================

JavaScript Debug Helpers

===============================================================================
*/
var SKIP_ALL_LOGGING = false;
var LOGGING_WITH_VISUAL_STUDIO = !!((<any>window).Debug && (<any>window).Debug.debuggerEnabled);

var DEBUG_LOG_MODE = true && !LOGGING_WITH_VISUAL_STUDIO;
function isd ( v: boolean ): boolean { return DEBUG_LOG_MODE && v; }

var DEBUG_WEBGL_UTIL = isd( false );
var DEBUG_RENDER_METHODS = isd( false );
var DEBUG_APPEND_TEXTURES_TO_BODY = isd( false );
var DEBUG_RegisterDeclFolder = isd( false );
var DEBUG_DeriveTangents = isd( false );
var DEBUG_R_DeriveTangents = isd( false );
var DEBUG_COMPILER = isd(true );
var DEBUG_GUI = isd(false );
var DEBUG_HASHINDEX = isd( false );
var DEBUG_STRPOOL = isd( false );
var DEBUG_RENDERWORLD_LOAD = isd( false ); // todo: check output
var DEBUG_CM = isd(true); // todo: check output
var DEBUG_MAP_FILE = isd(false ); // todo: check output
var DEBUG_SCRIPT = isd(false ); 
var DEBUG_SPAWN = isd(true);

var appendToLog = false;
var dlogOutput = "";
var diffDoesNotMatch = false;

function dlog ( log: boolean, format: string, ...args: any[] ):void {
    checkDiffStatus ( );
    if ( !skipLog( log ) ) {
        var text = vsprintf( format, args );
        pushLog( text );
    }
}

function dlogQuick ( log: boolean, text:string ):void {
    checkDiffStatus ( );
    if ( !skipLog( log ) ) {
         pushLog( text );
    }
}

function dlogFlush ( ): void {
    ( <any>window ).logToServer( dlogOutput );
    appendToLog = true;
    dlogOutput = "";
}

function checkDiffStatus(): void {
    if ( diffDoesNotMatch ) {
        throw "diff does not match";
    }
}

function skipLog (log:boolean ): boolean {
    return !log || SKIP_ALL_LOGGING || LOGGING_WITH_VISUAL_STUDIO;
}

function pushLog ( text: string ): void {
    if ( dlogOutput.length > 50000 ) {
        dlogFlush ( );
    }

    dlogOutput += text;
}

function logTexture(image: idImage, text:string, width: number, height: number, data: Uint8Array ): void {
	if ( DEBUG_APPEND_TEXTURES_TO_BODY ) {
		var can = <HTMLCanvasElement>document.createElement( "canvas" ),
			ctx = can.getContext( '2d' );
		can.width = width;
		can.height = height;
		var img = ctx.createImageData( width, height );
        //todo: use set?
		for ( var i = 0; i < img.data.length; i++ ) {
			img.data[i] = data[i];
		}
		ctx.putImageData( img, 0, 0 );
		console.log(text);
		//console.image(can.toDataURL());

		can.title = text;
		document.body.appendChild( can );

		//var originalImage = <HTMLImageElement>document.createElement( "img" );
		//originalImage.src = "demo/" + image.imgName.data + ".tga";
		//document.body.appendChild( originalImage );

		var br = <HTMLBRElement>document.createElement( "br" );
		document.body.appendChild( br );
	}
}