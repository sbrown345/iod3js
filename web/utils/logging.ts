/*
===============================================================================

JavaScript Debug Helpers

===============================================================================
*/
var LOG_TO_CONSOLE = false;
var SKIP_ALL_LOGGING = false;

var DEBUG_LOG_MODE = true;
function isd(v: boolean): boolean { return DEBUG_LOG_MODE && v; }

var DEBUG_WEBGL_UTIL = isd(true);
var DEBUG_RegisterDeclFolder = isd(true);
var DEBUG_Lexer = isd(true);
var DEBUG_DeriveTangents = isd(true);
var DEBUG_R_DeriveTangents = isd(true);

function dlog(log: boolean, format: string, ...args: any[]) {
	if (!log || SKIP_ALL_LOGGING) return;
	if (LOG_TO_CONSOLE) {
		console.log.apply(console, args.unshift(format.trim()));
	} else {
		var text = vsprintf(format, args);

		if (dlogOutput[dlogOutput.length - 1].length > 10000) {
			dlogOutput.push([]);
		}

		dlogOutput[dlogOutput.length - 1].push(text);
	}
};

var dlogConcat = function (arr: any[]): string {
	var s: string, len: number, i: number;
	len = arr.length;
	for (s = "", i = 0; i < len; s += arr[i], i++);
	return s;
};

var dlogOutput = [[]];

function dlogFlush(append = false): void {
	for (var i = 0; i < dlogOutput.length; i++) {

		var logText = dlogConcat(dlogOutput[i]);
		sendTextNew(logText, i !== 0 || append);
	}

	dlogOutput = [[]];
};

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
