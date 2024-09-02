import { MMU } from "./MMU";
import { registry16, registry8 } from "./registry";
export enum FLAG {
    z = 0b10000000,
    n = 0b01000000,
    h = 0b00100000,
    c = 0b00010000,
}
type Flag = 1 | 0;
export class Z80 {
    private _m: MMU = new MMU();

    private _m_cycle:number = 0;

    private b: registry8 = new registry8("b");
    private c: registry8 = new registry8("c");
    private d: registry8 = new registry8("d");
    private e: registry8 = new registry8("e");
    private h: registry8 = new registry8("h");
    private l: registry8 = new registry8("l");

    private af: registry16 = new registry16("af");
    private pc: registry16 = new registry16("pc");
    private sp: registry16 = new registry16("sp");

    private registers: { [id: string]: registry16 | registry8 } =
        { b: this.b, c: this.c, d: this.d, e: this.e, h: this.h, l: this.l, af: this.af, pc: this.pc, sp: this.sp }

    public getRegisterValue(name: string) {
        return this.registers[name].get();
    }

    public setRegisterValue(name: string, value: number) {
        return this.registers[name].set(value);
    }

    public setFlags(z: Flag, n: Flag, h: Flag, c: Flag) {
        let value = 0;

        if (z) {
            value |= FLAG.z;
        }
        if (n) {
            value |= FLAG.n;
        }
        if (h) {
            value |= FLAG.h;
        }
        if (c) {
            value |= FLAG.c;
        }
        this.af.getLow().set(value);
    }


    public getFlag(flag: FLAG): Flag {
        return (this.af.getLow().get() & flag) !== 0 ? 1 : 0;
    }

    private reset() {
        
    }

    private execute() {
        const inst = this._m.rb(this.pc.get());
        this.pc.set((this.pc.get() + 1) & 0XFFFF);
        const inst_func = this.getInstruction(inst);
        //run instfunc()
        
    }

    private getInstruction(code:number) {

    }

    //alu
    private adc(a: number, b: number, carry: Flag) {
        const result = (a + b + carry);
        const z: Flag = (result & 0xFF) === 0 ? 1 : 0;
        const n: Flag = 0;
        const h: Flag = (a & 0xF) + (b & 0xF) + carry > 0XF ? 1 : 0;
        const c: Flag = result > 0XFF ? 1 : 0;
        this.setFlags(z, n, h, c);
        return result & 0XFF;
    }

    private add(a: number, b: number) {
        return this.adc(a, b, 0);
    }

    private and(a: number, b: number) {
        const result = (a & b) & 0xFF;
        const z:Flag = result === 0 ? 1:0;
        const n = 0;
        const h = 1;
        const c = 0;
        this.setFlags(z,n,h,c);
        return result;
    }

    private or(a: number, b: number) {
        const result = (a | b) & 0xFF;
        const z:Flag = result === 0 ? 1:0;
        const n = 0;
        const h = 1;
        const c = 0;
        this.setFlags(z,n,h,c);
        return result;
    }

    private xor(a: number, b: number) {
        const result = (a ^ b) & 0xFF;
        const z:Flag = result === 0 ? 1:0;
        const n = 0;
        const h = 1;
        const c = 0;
        this.setFlags(z,n,h,c);
        return result;
    }

    private cp(a: number, b: number) {
        const result = a - b;
        const z: Flag = (result & 0xFF) === 0 ? 1 : 0;
        const n: Flag = 0;
        const h: Flag = (b & 0xF) > (a & 0xF) ? 1 : 0;
        const c: Flag = b > a ? 1 : 0;
        this.setFlags(z, n, h, c);
        return result & 0XFF;
    }

    private inc(a:number) {
        const result  = a + 1;
        const z: Flag = (result & 0xFF) === 0 ? 1 : 0;
        const n:Flag = 0;
        const h:Flag = (a & 0xF) >= 0xF ? 1 : 0;
        const c:Flag = this.getFlag(FLAG.c);
        this.setFlags(z, n, h, c);
        return result & 0xFF; 
    }

    private dec(a:number) {
        const result  = a - 1;
        const z: Flag = (result & 0xFF) === 0 ? 1 : 0;
        const n:Flag = 1;
        const h:Flag = (a & 0xF) === 0 ? 1 : 0;
        const c:Flag = this.getFlag(FLAG.c);
        this.setFlags(z, n, h, c);
        return result & 0xFF;
    }

    private sbc(a:number,b:number,carry:Flag) {
        const result = a - b - carry;
        const z:Flag = 0;
        const n:Flag = 1;
        const h:Flag =  (b & 0xF) + carry > (a & 0xF) ? 1 : 0;
        const c:Flag = (result < 0) ? 1 : 0
        this.setFlags(z,n,h,c);
        return result & 0xFF;
    }

    private sub(a: number, b: number) {
        return this.sbc(a, b, 0);
    }

    private ld(a:registry8,b:number) {

    }

    //alu end
    
    private bitu3r8(u3:number,r8:number) {
        const result = u3 & r8;
        const z:Flag = u3 === 0?1:0;
        const n:Flag = 0;
        const h:Flag = 0;
        const c:Flag = this.getFlag(FLAG.c);
        this.setFlags(z,n,h,c);
        return result;
    }

    private rl(r8:number) {
        let result = ( r8<<1 | this.getFlag(FLAG.c) ) & 0xFF;
        const z:Flag = result === 0 ?1:0;
        const n:Flag = 0;
        const h:Flag = 0;
        const c:Flag = (r8 & 0x80) !== 0 ?1:0; //0b10000000
        this.setFlags(z, n, h, c);
        return result;
    }

    private rlc(r8:number) {
        let result = ( r8<<1 | ((r8 & 0x80) !== 0?1:0) ) & 0xFF;
        const z:Flag = result === 0 ?1:0;
        const n:Flag = 0;
        const h:Flag = 0;
        const c:Flag = (r8 & 0x80) !== 0 ?1:0; //0b10000000
        this.setFlags(z, n, h, c);
        return result;
    }



    private NOP() {
        this.pc.set(this.pc.get()+1);
        this._m_cycle+=1;
    }






}