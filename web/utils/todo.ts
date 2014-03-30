// keep track of things to do
function todo(reason?: string) {
    //console.log("todo", reason);
}

function notNeeded(reason?: string) {
    //console.log("todo", reason);
}

function todoImportant(reason: string) {
	console.log("todoImportant", reason);
}

function todoUnimportant(reason?: string): void {
}

function todoMaybeGameDLL(reason?: string): void {
}

function todoThrow ( message: any = "" ): any {
	if ( window.location.search.indexOf( "skipTodoThrow" ) === -1 ) {
		dlogFlush ( );
		console.log( idFileSystemLocal.tempFilesForWriting );
		debugger;
		console.error( "todoThrow \n", message );
		throw "!";
	}
}

// track all temp hardcoded stuff
function tempHC(fn: () => void): void {
    fn();
}

// the first version will take the most direct route, add these markers in to track
function path(location: string) : void {
    var stack = (new Error()).stack;
    if(stack) {
        var depth = stack.split("\n").length - 4; // skip first line, this function, load gamme, xhr load
        depth = Math.max(0, depth);
        var spacing = Array(depth+1).join(" ");
        console.info("%cpath: %s%s", "color: green", spacing, location);
    }
}

interface Error {
    stack: string;
}

var todoBindBuffersNull = false;

enum asserMapsList{
	demo_mars_city1 = 1
}
function assertMapSpecific(map: asserMapsList, condition: boolean) {
	// todo: check map
	if ( condition ) {
		
	}
}