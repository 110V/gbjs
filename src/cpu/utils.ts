export function decimalToBits(d:number){
    if(d>255) {
        const num = Math.max(0, Math.min(65536, Math.floor(d)));
        return num.toString(2).padStart(16, '0');
    }
    const num = Math.max(0, Math.min(255, Math.floor(d)));
    return num.toString(2).padStart(8, '0');
}

export function decimalToHex(d:number) {
    if (d > 255) {
        const num = Math.max(0, Math.min(65536, Math.floor(d)));
        return num.toString(16).padStart(4, '0').toUpperCase();
    }
    const num = Math.max(0, Math.min(255, Math.floor(d)));
    return num.toString(16).padStart(2, '0').toUpperCase();
}
