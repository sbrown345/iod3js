// keep track of things to do
function todo(reason?: string) {
    //console.log("todo", reason);
}

function notNeeded(reason?: string) {
    //console.log("todo", reason);
}

function todoUnimportant(reason?: string): void {
}

function todoMaybeGameDLL(reason?: string): void {
}

function todoThrow(message: string = ""): any {
	dlogFlush();
	console.log( idFileSystemLocal.tempFilesForWriting );
    //debugger;
    console.error("todo \n" + message);
    throw "!";
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