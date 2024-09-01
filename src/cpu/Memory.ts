export class Memory {
    private _data: Uint8Array;
    private _startAddress: number = 0;
    private _endAddress: number = 0;
    private _getData: (index: number) => number = (index: number) => this._data[index];
    private _setData: (index: number, value: number) => void = (index: number, value: number) => { this._data[index] = value };

    constructor(startAddress: number, endAddress: number) {
        this._startAddress = startAddress;
        this._endAddress = endAddress;
        this._data = new Uint8Array(this._endAddress - this._startAddress + 1);
        this._data.fill(0);
    }

    public checkAddress(address: number) {
        return this._startAddress <= address && address <= this._endAddress;
    }

    public read(address: number) {
        return this._getData(address - this._startAddress);//masking?
    }

    public read16(address: number) {
        const high = this.read(address);
        const low = this.read(address + 1);
        return (high << 8) | low;
    }

    public write(address: number, value: number) {
        this._setData(address - this._startAddress, value);
    }

    public write16(address: number, value: number) {
        const high = value >> 8;
        const low = value & 0x00FF;
        this.write(address, high);
        this.write(address + 1, low);
    }

    public link(read: (index: number) => number, write: (index: number, value: number) => void) {
        this._getData = read;
        this._setData = write;
    }

}