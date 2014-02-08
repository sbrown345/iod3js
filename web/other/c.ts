var NULL: number = 0; //var NULL:any = null;


function strlen ( str: string ): number;
function strlen ( str: Uint8Array ): number;
function strlen ( str: any ): number {
	return str.length;
}

function strcpy(destination: Uint8Array, source: string): Uint8Array {
	//assert.isType(Uint8Array, destination).isString(source);

	var i: number;
	for (i = 0; i < source.length && source.charCodeAt(i); i++) {
		destination[i] = source.charCodeAt(i);
	}

	destination[i] = 0; // because the js string doesn't have a final 0

	return destination;
}

function strncpy(destination: Uint8Array, source: string, numChars: number): Uint8Array {
	//assert.isType(Uint8Array, destination).isString(source);

	for (var i = 0; i < source.length && i < numChars; i++) {
		destination[i] = source.charCodeAt(i);
	}

	destination[i] = 0;

	return destination;
}

function strcmp(str1: string, str2: string): number {
	//assert.isString(str1).isString(str2);
	if (str1 == str2) {
		return 0;
	}

	if (str1 > str2) {
		return 1;
	}

	return -1;
}

function isdigit ( c: string ): number {
    return ( c >= "0" && c <= "9" ) ? 1 : 0;
}

function tolower(s: string): string {
	return s.toLowerCase();
}

function toupper(s: string): string {
	return s.toUpperCase();
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

function zeroArray ( array: ArrayBufferView ): void;
function zeroArray ( array: number[] ): void;
function zeroArray ( array: any ): void {
	for ( var i = 0; i < array.length; i++ ) {
		array[i] = 0;
	}
}

function memset ( arr: ArrayBufferView, value: number, num: number ): void {
    //assert.uint8(value).int32(num);
    var startIndex = 0;
    var uint8Array = new Uint8Array( arr.buffer );
    for ( var i = startIndex; i < num; i++ ) {
        uint8Array[i] = value;
    }
}

function short(buf: Uint8Array, ptr: number): number {
	return buf[ptr] + (buf[ptr + 1] << 8);
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

function qsort ( base: any[], num: number, size: number, compar: ( a: any, b: any ) => number ): void {
	var array = base.slice(0, num).sort(compar);
	for ( var i = 0; i < num; i++ ) {
		base[i] = array[i];
	}
}

function timeGetTime ( ): number {
	return +new Date;
}

var printf = console.log.bind(console);

var _sscanf = window["sscanf"];
var sscanf = function ( s: string, format: string ): any[] {
	var array = _sscanf( s, format );
	var arrayWithoutNulls: any[] = [];
	for ( var i = 0; i < array.length && array[i] !== null && array[i] !== undefined; i++ ) {
		arrayWithoutNulls[i] = array[i];
	}

	return arrayWithoutNulls;
};

function Mem_Free ( arg: any ) {
    
}

function malloc ( size: number ): ArrayBuffer {
	return new ArrayBuffer( size );
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


function __builtin_trap ( ): void {
	exit(0);
}

function exit (code:number ): void {
	throw "exit(" + code + ");";
}