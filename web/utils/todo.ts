// keep track of things to do
function todo(reason?: string): void {
    //console.log("todo", reason);
}

function notNeeded(reason?: string): void {
    //console.log("todo", reason);
}

function todoImportant(reason: string): void {
	console.log("todoImportant", reason);
}

function todoUnimportant(reason?: string): void {
}

function todoRewrite(reason?: string): void {
}

function todoMaybeGameDLL(reason?: string): void {
}

function todoThrow ( message: any = "" ): any {
	if ( window.location.search.indexOf( "skipTodoThrow" ) === -1 ) {
		dlogFlush ( );
		console.log( idFileSystemLocal.tempFilesForWriting );
		debugger;
		console.error( "todoThrow \n", message );
		console.error( "stack \n", ( new Error ( ) ).stack );
		if ( !LOGGING_WITH_VISUAL_STUDIO ) {
			throw "!";
		}
	}
}

interface Error {
    stack: string;
}

var todoBindBuffersNull = false;

enum assertMapsList{
	demo_mars_city1 = 1
}
function assertMapSpecific(map: assertMapsList, condition: boolean):void {
	// todo: check map
	
	assert( condition );
}