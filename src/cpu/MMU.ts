import { Memory } from "./Memory";
export class MMU {
    private _rom0 =    new Memory(0x0000,0x3FFF);
    private _rom1 =    new Memory(0x4000,0x7FFF);
    private _vram =    new Memory(0x8000,0x9FFF);
    private _exram =   new Memory(0xA000,0xBFFF);
    private _wram0 =   new Memory(0xC000,0xCFFF);
    private _wram1 =   new Memory(0xD000,0xDFFF);
    private _echoram = new Memory(0xE000,0xFDFF);
    private _oam =     new Memory(0xFE00,0xFE9F);

    private _io =      new Memory(0xFF00,0xFF7F);
    private _hram =    new Memory(0xFF80,0xFFFE);
    private _ie =      new Memory(0xFFFF,0xFFFF);

    private _memories:Memory[] = [this._rom0,this._rom1,this._vram,this._exram,this._wram0,
        this._wram1,this._echoram,this._oam,this._io,this._hram,this._ie
    ];

    private getMemory(address:number){
        const result = this._memories.find((m)=>m.checkAddress(address));
        if(!result){
            throw new Error("wrong address");
        }
        return result
    }

    public rb(addr:number):number
    {
        return this.getMemory(addr).read(addr);
    }

    public rw(addr:number):number
    {
        return this.getMemory(addr).read16(addr);
    }

    public wb(addr:number,value:number)
    {
        this.getMemory(addr).write(addr,value)
    }

    public ww(addr:number,value:number)
    {
        this.getMemory(addr).write16(addr,value)
    }

    public loadRom(data:string){
        this._rom0.link(
        (addr)=>{
            return data.charCodeAt(addr);
        },
        (_data)=>{
            throw new Error("rom is readonly");
        })
    }
}