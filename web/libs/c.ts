var NULL: number = 0; //var NULL:any = null;


function strlen ( str: string ): number {
    return str.length;
}

function isdigit ( c: string ): number {
    return ( c >= "0" && c <= "9" ) ? 1 : 0;
}

function memset ( arr: ArrayBufferView, value: number, num: number ): void {
    //assert.uint8(value).int32(num);
    var startIndex = 0;
    var uint8Array = new Uint8Array( arr.buffer );
    for ( var i = startIndex; i < num; i++ ) {
        uint8Array[i] = value;
    }
}

function sizeof(obj: any) : number {
    if(typeof obj === "number") {
        debugger;
        throw "cannot get size of number type";
    }

	if ( obj === int) {
		return 4;
	}

    if (obj.size !== undefined) {
        return obj.size;
    }

    if(obj.buffer) {
        return obj.buffer.byteLength;
    }

    throw "unsure of size of this type";
    ////return obj.length;
}

function sizeofSingleItem ( arr: Float64Array ): number; // works for all typed arrays
function sizeofSingleItem ( arr: any ): number {
    return arr.BYTES_PER_ELEMENT;
}

var min = Math.min;
var max = Math.max;
var pow = Math.pow;
var sin = Math.sin;
var cos = Math.cos;
var atan = Math.atan;
var atanf = Math.atan;
var floor = Math.floor;
var abs = Math.abs;
var labs = Math.abs;
var fabs = Math.abs;
var sqrt = Math.sqrt;

function rand() {
    todo("rand");
    return 10;
}

var printf = console.log.bind(console);

function Mem_Free ( arg: any ) {
    
}

class FILE {

    constructor ( arrayBuffer: ArrayBuffer ) {
        this.arrayBuffer = arrayBuffer;
    }

    arrayBuffer: ArrayBuffer;
}
