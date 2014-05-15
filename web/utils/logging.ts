/*
===============================================================================

JavaScript Debug Helpers

===============================================================================
*/
var LOG_TO_CONSOLE = false;
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
var DEBUG_COMPILER = isd(false );
var DEBUG_GUI = isd(false );
var DEBUG_HASHINDEX = isd( false );
var DEBUG_STRPOOL = isd( false );
var DEBUG_RENDERWORLD_LOAD = isd( false ); // todo: check output
var DEBUG_CM = isd(false); // todo: check output
var DEBUG_MAP_FILE = isd(false ); // todo: check output
var DEBUG_SCRIPT = isd(false ); 
var DEBUG_SPAWN = isd(true); 
todo:"push logs to server so can log larger amounts without using up chrome memory"

function dlog(log: boolean, format: string, ...args: any[]) {
	if (!log || SKIP_ALL_LOGGING || LOGGING_WITH_VISUAL_STUDIO) return;
	if (LOG_TO_CONSOLE) {
		console.log.apply(console, args.unshift(format.trim()));
	} else {
		var text = vsprintf(format, args);

		if (dlogOutput.length > 50000) {
			dlogFlush ( );
		}

		dlogOutput.push(text);
	}
};

var dlogConcat = function (arr: any[]): string {
	var s: string, len: number, i: number;
	len = arr.length;
	for (s = "", i = 0; i < len; s += arr[i], i++);
	return s;
};

var dlogOutput:string[] = [];
var appendToLog = false;

function dlogFlush() {
	sendTextNew(dlogConcat(dlogOutput), appendToLog);
	appendToLog = true;
	dlogOutput = [];
}

function sendTextNew(text: string, append: boolean): void {
	var xhr = new XMLHttpRequest();
	var body = "string=" + encodeURIComponent(text);
	if (append) {
		body += "&append=true";
	}
	xhr.open("POST", "log.aspx", false);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(body);
}

function logTexture(image: idImage, text:string, width: number, height: number, data: Uint8Array ): void {
	if ( DEBUG_APPEND_TEXTURES_TO_BODY ) {
		var can = <HTMLCanvasElement>document.createElement( "canvas" ),
			ctx = can.getContext( '2d' );
		can.width = width;
		can.height = height;
		var img = ctx.createImageData( width, height );
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