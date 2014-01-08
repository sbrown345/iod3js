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

function sizeof ( arr: Float64Array ): number; // works for all typed arrays
function sizeof ( arr: any ): number {
    return arr.BYTES_PER_ELEMENT;
}
