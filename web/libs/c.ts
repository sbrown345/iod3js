var NULL:number = 0;

interface String {
    idx: number;
    v(offset?:number):string;
    c(offset?:number):number;
    increment(num?:number):void;
}

String.prototype.idx = 0;

String.prototype.v = function(offset:number = 0): string {
    return this[this.idx + offset];
};

String.prototype.c = function(offset:number = 0): number {
    return this.charCodeAt(this.idx + offset);
};

String.prototype.increment = function(num:number = 1): void {
    this.idx += num;
};