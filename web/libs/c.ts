var NULL: number = 0; //var NULL:any = null;


function strlen ( str: string ): number {
    return str.length;
}

function isdigit ( c: string ): number {
    return ( c >= "0" && c <= "9" ) ? 1 : 0;
}

function memcpy(destination: ArrayBufferView, source: ArrayBufferView, count: number): void {
	var sourceArray = new Uint8Array(destination.buffer);
	var destArray = new Uint8Array(source.buffer);
	for (var i = 0; i < count; i++) {
		sourceArray[i] = destArray[i];
	}
}

//function memcpy(destination: P, source: P, count: number): void {
//	for (var i = 0; i < count; i++) {
//		destination.s(source.v());
//		destination.incr();
//		source.incr();
//	}
//}

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

class P {
	buf: ArrayBuffer;
	arr: Uint8Array;
	idx: number;

	s(v: number, offset: number = 0): void {
		this.arr[this.idx + offset] = v;
	}

	v(offset: number = 0): number {
		return this.arr[this.idx + offset];
	}

	incr(): void {
		this.idx++;
	}

	constructor(buffer: ArrayBuffer, indexOffset: number = 0) {
		if (buffer["buffer"])
			this.buf = buffer["buffer"]; // typescript wasn't warning about typed arrays, so force it to deal with either
		else
			this.buf = buffer;

		this.arr = new Uint8Array(this.buf);
		this.idx = indexOffset;
	}
}
