interface ITypeInfo {
    //typeInfo: string[][];
    //size: number;
}

function ITypeInfoLogger(v: ITypeInfo, typeInfo: string[][]):void {
    for (var i = 0; i < typeInfo.length; i++) {
        var name = typeInfo[i][0];   
        var type = typeInfo[i][1];   
        console.log(name + ": " + v[name] + "\t\t(" + type + ")");
    }
}

function ITypeInfoCopier(dest: ITypeInfo, source: ITypeInfo, typeInfo: string[][]):void {
    for (var i = 0; i < typeInfo.length; i++) {
        var name = typeInfo[i][0];   
        dest[name] = source[name]; 
    }
}

function memcpyStruct(dest: ITypeInfo[], source: ITypeInfo[], count: number, typeInfo: string[][]):void {
	for ( var i = 0; i < count; i++ ) {
		ITypeInfoCopier( dest[i], source[i], typeInfo );
	}
}

//var int8ConvertArray = new Int8Array(1);
//var int8 = function (v: number): number {
//   int8ConvertArray[0] = v;
//    return int8ConvertArray[0];
//};

//var uint8ConvertArray = new Uint8Array(1);
//var uint8 = function (v: number): number {
//   uint8ConvertArray[0] = v;
//    return uint8ConvertArray[0];
//};

//var int16ConvertArray = new Int16Array(1);
//var int16 = function (v: number): number {
//   int16ConvertArray[0] = v;
//    return int16ConvertArray[0];
//};

//var uint16ConvertArray = new Uint16Array(1);
//var uint16 = function (v: number): number {
//   uint16ConvertArray[0] = v;
//    return uint16ConvertArray[0];
//};

//var float32ConvertArray = new Float32Array(1);
//var float32 = function (v: number): number {
//   float32ConvertArray[0] = v;
//    return float32ConvertArray[0];
//};

var int = function (v: number): number {
    return v | 0;   
};

var uint32 = function (v: number): number {
    return v >>> 0;
};

function atoi ( s: string ): number {
    return parseInt( s ) || 0;
}

function atof ( s: string ): number {
    return parseFloat( s ) || 0;
}

interface Boolean {
    toNum():number;
}
Boolean.prototype.toNum = function ( ):number {
    return this ? 1 : 0;
};

//var unsigned = uint32;

function newStructArray<T>($class: any, count: number): T[] {
    var array = new Array(count);
    for (var i = 0; i < count; i++) {
        array[i] = new $class();
    }

    array[-1] = new $class(); // various places check for a -1 which doesn't crash C. (this probably breaks v8 perf opt)
    return array;
}

interface Object {
    init():void;
}

function clearStructArray(array : Array<any>) : void {
    for (var i = 0; i < array.length; i++) {
        array[i].init();
    }
}

function multiDimArray <T>(arrayClass: any, num: number, arrLength: number): T[] {
    var multiDimArray = new Array(num);
    for (var i = 0; i < num; i++) {
        multiDimArray[i] = new arrayClass(arrLength);
    }
    return multiDimArray;
}

function $3dArray <T>(arrayClass: any, d1: number, d2: number, d3: number):Array<Array<T>> {
    var array = new Array(d1);
    for (var i = 0; i < d1; i++) {
        array[i] = new Array(d2);
        for (var j = 0; j < d2; j++) {
            array[i][j] = new arrayClass(d3);
        }
    }

    array["totalSize"] = d1 * d2 * d3;
    return array;
}

function flatten3DArray <T>( arrayClass: any, array:Array<Array<T>> ): T {
    var flatArray = new arrayClass( array["totalSize"] );
    var count = 0;
    var d1 = array;
    for (var i = 0; i < d1.length; i++) {
        var d2 = d1[i];
        for (var j = 0; j < d2.length; j++) {
            var d3 = d2[j];
            for ( var k = 0; k < d3["length"]; k++ ) {
                flatArray[count++] = d3[k];
            }
        }
    }

    return flatArray;
}

function memset3DArray<T> ( array: Array<Array<T>>, val: number ): void {
	var d1 = array;
	for ( var i = 0; i < d1.length; i++ ) {
		var d2 = d1[i];
		for ( var j = 0; j < d2.length; j++ ) {
			var d3 = d2[j];
			for ( var k = 0; k < d3["length"]; k++ ) {
				d3[k] = val;
			}
		}
	}
}

//// todo: rename
//// arguments are only optional so an error isn't thrown if array is undefined (custom typescript version)
//function set0OrNewArray(array?, type?:any, length?:number):any {
//    if(!array) {
//        return new type(length);
//    }

//    for (var i = 0; i < array.length; i++) {
//        array[i] = 0;
//    }

//    return array;
//}

//function to2dMatrix(multiDimMatrix: Float32Array[]):Float32Array {
//    return new Float32Array([ 
//        multiDimMatrix[0][0],
//        multiDimMatrix[1][0],
//        multiDimMatrix[2][0],
//        multiDimMatrix[3][0],
//        multiDimMatrix[0][1],
//        multiDimMatrix[1][1],
//        multiDimMatrix[2][1],
//        multiDimMatrix[3][1],
//        multiDimMatrix[0][2],
//        multiDimMatrix[1][2],
//        multiDimMatrix[2][2],
//        multiDimMatrix[3][2],
//        multiDimMatrix[0][3],
//        multiDimMatrix[1][3],
//        multiDimMatrix[2][3],
//        multiDimMatrix[3][3]]);
//}

//class Ptr {
//    //buf: ArrayBuffer;
//    array: Uint8Array;
//    idx: number;
//    view: DataView;

//    getUint8() {
//        if (!this.view) {
//            this.view = new DataView(this.array.buffer); // this breaks if a subarray is passed in
//        }

//        return this.view.getUint8(this.idx); // same as getValue!!
//    }

//    getInt8() {
//        if (!this.view) {
//            this.view = new DataView(this.array.buffer); // this breaks if a subarray is passed in
//        }

//        return this.view.getInt8(this.idx); // same as getValue!!
//    }

//    getUint16() {
//        if (!this.view) {
//            this.view = new DataView(this.array.buffer);// this breaks if a subarray is passed in
//        }

//        return this.view.getUint16(this.idx, true);
//    }


//    getInt16() {
//        if (!this.view) {
//            this.view = new DataView(this.array.buffer);// this breaks if a subarray is passed in
//        }

//        return this.view.getInt16(this.idx, true);
//    }

//    getUint32() {
//        if (!this.view) {
//            this.view = new DataView(this.array.buffer);// this breaks if a subarray is passed in
//        }

//        return this.view.getUint32(this.idx, true);
//    }

//    getInt32() {
//        if (!this.view) {
//            this.view = new DataView(this.array.buffer);// this breaks if a subarray is passed in
//        }

//        return this.view.getInt32(this.idx, true);
//    }

//    setValue(v: number) {
//        this.array[this.idx] = v;
//    }

//    getValue(): number {
//        return this.array[this.idx];
//    }

//    constructor(array: Uint8Array, index: number = 0) {
//        //this.buf = array.buffer; 
//        this.array = array; // don't change this to buffer because makepalookup will break because of the subarray stuff - subarrays arraybuffer doesn't take into account the index
//        this.idx = index;

//        if (array.BYTES_PER_ELEMENT !== 1) {
//             throw "must be uint8 array (instance of didnt' work!!";
//        }

//    }
//}

//class P {
//    buf: ArrayBuffer;
//    arr: Uint8Array;
//    idx: number;

//    s(v: number, offset: number = 0): void {
//        this.arr[this.idx + offset] = v;
//    }

//    v(offset: number = 0): number {
//        return this.arr[this.idx + offset];
//    }

//    incr(): void {
//        this.idx++;
//    }

//    constructor(buffer: ArrayBuffer, indexOffset: number = 0) {
//        if(buffer["buffer"])
//            this.buf = buffer["buffer"]; // typescript wasn't warning about typed arrays, so force it to deal with either
//        else
//            this.buf = buffer;

//        this.arr = new Uint8Array(this.buf);
//        this.idx = indexOffset;
//    }
//}

//////class Pt {
//////    arr: Array;
//////    idx: number;

//////    s(v: number, offset: number = 0): void {
//////        this.arr[this.idx + offset] = v;
//////    }

//////    v(offset: number = 0): number {
//////        return this.arr[this.idx + offset];
//////    }

//////    incr(): void {
//////        this.idx++;
//////    }

//////    constructor(arr: Array, indexOffset: number = 0) {
//////        this.arr = arr;
//////        this.idx = indexOffset;
//////    }
//////}

class R<T> {
    $: T;

    constructor(val?: T) {
        this.$ = val;
    }
}

interface String {
  toUint8Array: (destination?:Uint8Array) => Uint8Array;
  endsWith(str:string):boolean;
}

String.prototype.toUint8Array = function ( destination?: Uint8Array ): Uint8Array {
	var array = destination || new Uint8Array( this.length );
	var i = 0;
	for ( ; i < this.length; i++ ) {
		array[i] = this.charCodeAt( i );
	}

	//if ( array.length > this.length ) {
	//	array[i+1] = 0;
	//}

	return array;
};

String.prototype.endsWith = function ( suffix ) {
    return this.indexOf( suffix, this.length - suffix.length ) !== -1;
};

interface Uint8Array {
  toString: () => string;
}

Uint8Array.prototype.toString = function () : string {
    var str = "";
    for (var i = 0; i < this.length; i++) {
        if(!this[i]) {
            break;
        }
        str += String.fromCharCode(this[i]);
    }

    return str;
};

interface VBArray {
	toArray():Array<number>
}

declare var VBArray: {
	new ( text?: any ): VBArray;
};