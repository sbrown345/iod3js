var NULL: number = 0; //var NULL:any = null;

var DEBUG = true;

var __DATE__ = "2014-2-8";
var __TIME__ = "00:00:00";

function strlen ( str: string ): number;
function strlen ( str: Uint8Array ): number;
function strlen ( str: any ): number {
	return str.length;
}

function strcpy ( destination: Uint8Array, source: string ): Uint8Array
function strcpy ( destination: Uint8Array, source: Uint8Array ): Uint8Array
function strcpy ( destination: Uint8Array, source: any ): Uint8Array {
	var i: number;
	if ( typeof source === "string" ) {
		for ( i = 0; i < source.length && source.charCodeAt( i ); i++ ) {
			destination[i] = source.charCodeAt( i );
		}
	} else if ( source instanceof Uint8Array ) {
		for ( i = 0; i < source.length && source[i]; i++ ) {
			destination[i] = source[i];
		}
	} else {
		todoThrow ( );
	}

	destination[i] = 0;

	return destination;
}

function strncpy(destination: Uint8Array, source: string, numChars: number): Uint8Array {
	//assert.isType(Uint8Array, destination).isString(source);

	for (var i = 0; i < numChars; i++) {
		destination[i] = source.charCodeAt(i) || 0;
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

function strchr ( str: Uint8Array, character: number ): Uint8Array {
	for ( var i = 0; i < str.length; i++ ) {
		if ( str[i] === character ) {
			return str.subarray( i );
		}
	}

	return null;
}

// todo: faster way
function strstr ( str1: Uint8Array, str2: string ): Uint8Array {
	var $string = str1.toString ( ); 
	var i = $string.indexOf( str2 );

	if ( i === -1 ) {
		return null;
	}

	return str1.subarray( i );
}

function strchrContains ( str: string, character: string ): boolean {
	return str.indexOf( character ) != -1;
}


function strstrContains ( str: string, character: string ): boolean {
	return str.indexOf( character ) != -1;
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

// don't use subarray!
function memcpy2d ( destination: Int32Array[], source: Int32Array[] ): void {
	for ( var i = 0; i < destination.length; i++ ) {
		var subArrayDest = destination[i];
		var subArraySrc = source[i];
		for ( var j = 0; j < subArrayDest.length; j++ ) {
			subArrayDest[j] = subArraySrc[j];
		}
	}
}

function memcpy(destination: ArrayBufferView, source: ArrayBufferView, count: number): void {
	if ( !destination ) {
		return;
	}
	// todo: use uint32 arrays instead - less operations
	var sourceArray = new Uint8Array(destination.buffer);
	var destArray = new Uint8Array(source.buffer);
	for (var i = 0; i < count; i++) {
		sourceArray[i] = destArray[i];
	}
}

// _can_ use subarray
function memcpyUint8Array(destination: ArrayBufferView, source: Uint8Array, count: number): void {
	for (var i = 0; i < count; i++) {
		destination[i] = source[i];
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

function memset ( arr: Uint8Array, value: number, num: number ): void
function memset ( arr: Int8Array, value: number, num: number ): void
function memset ( arr: Uint16Array, value: number, num: number ): void
function memset ( arr: Int16Array, value: number, num: number ): void
function memset ( arr: Uint32Array, value: number, num: number ): void
function memset ( arr: Int32Array, value: number, num: number ): void
function memset ( arr: Uint8Array /*any*/, value: number, num: number ): void {
	var startIndex = 0;
	var val: number;

	switch ( arr.BYTES_PER_ELEMENT ) {
	case 1:
		val = value;
		break;
	case 2:
		todoThrow ( );
		break;
	case 4:
		val = value << 24 | value << 16 | value << 8 | value;
		break;
	default:
		todoThrow ( );
	}

	var arrayLen = num / arr.BYTES_PER_ELEMENT;
	for ( var i = startIndex; i < arrayLen; i++ ) {
		arr[i] = val;
	}
}

function memsetP ( ptr: P, value: number, num: number ): void {
	var startIndex = ptr.idx;
	var uint8Array = new Uint8Array( ptr.buf );
	num += startIndex;
	for ( var i = startIndex; i < num; i++ ) {
		uint8Array[i] = value;
	}
}

function dynamic_cast<T> ( obj: any, type: any ): T {
	if ( obj instanceof type ) {
		return <T>obj;
	}

	return null;
}

function static_cast<T> ( obj: any ): T {
	return <T>obj;
}

function short ( buf: Uint8Array, ptr: number ): number {
	return buf[ptr] + ( buf[ptr + 1] << 8 );
}


var unsigned_short_arr = new Uint16Array( 1 );
function unsigned_short ( val: number ): number {
	unsigned_short_arr[0] = val;
	return unsigned_short_arr[0];
}

function float ( v: number ): number {
	return v;
}

function sizeof ( obj: any ): number {
	if ( typeof obj === "number" ) {
		debugger;
		throw "cannot get size of number type";
	}

	if ( obj === byte ) {
		return 1;
	}
	if ( obj === short || obj === unsigned_short ) {
		return 2;
	}

	if ( obj === int || obj === float ) {
		return 4;
	}

	if ( obj === long ) {
		return 8;
	}

	if ( obj.size !== undefined ) {
		return obj.size;
	}

	if ( obj.buffer ) {
		return obj.buffer.byteLength;
	}

	throw "unsure of size of this type";
	////return obj.length;
}

function sizeofSingleItem ( arr: Float64Array ): number; // works for all typed arrays
function sizeofSingleItem ( arr: any ): number {
	return arr.BYTES_PER_ELEMENT;
}

function stack_alloc ( size: number ): ArrayBuffer {
	return new ArrayBuffer( size );
}

var min = Math.min;
var max = Math.max;
var pow = Math.pow;
var sin = Math.sin;
var sinf = Math.sin;
var cos = Math.cos;
var cosf = Math.cos;
var atan = Math.atan;
var atanf = Math.atan;
var floor = Math.floor;
var floorf = Math.floor;
var abs = Math.abs;
var labs = Math.abs;
var fabs = Math.abs;
var sqrt = Math.sqrt;
var ceilf = Math.ceil;

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

function $delete ( obj: any ): void {
	if ( obj ) {
		if ( obj.destructor ) {
			obj.destructor ( );
		}
		if ( obj.opDelete ) {
			obj.opDelete ( );
		}
	}
}

function $deleteArray ( arr: any[] ): void {
	if ( !arr ) {
		return;
	}

	for ( var i = 0; i < arr.length; i++ ) {
		$delete( arr[i] );
	}
}

function OutputDebugString ( msg: string ) {
	console.debug( "OutputDebugString: " + msg );
}

function SetCursor ( cursor: string ) {
	document.body.style.cursor = cursor;
}

// track references

interface ITrackedObject {
	refAddress: number;
	trackObject ( ): void;
	destructor ( ): void;
}

class ObjectTracker {
	refs: ITrackedObject[] = [];

	addObject ( obj: ITrackedObject ): void {
		if ( typeof obj.refAddress === "number" ) {
			throw "Already tracking this ref";
		}

		this.refs.push( obj );
		obj.refAddress = this.refs.length - 1;
	}

	getObject<T> ( address: number, type: any = null ): T {
		var obj = this.refs[address];
		if ( !obj ) {
			throw "No such object";
		}

		if ( !( obj instanceof type ) ) {
			throw "Wrong type. Expected " + type + " but found " + obj;
		}

		return <T><any>obj;
	}

	removeObject(address: number): void {
		if ( this.refs[address] ) {
			this.refs[address].refAddress = null;
			delete this.refs[address];
		}
	}
}

var objectTracker = new ObjectTracker();
