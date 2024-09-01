class registry8{
    private _name:string;
    private _data:number
    constructor(name:string){
        this._name = name;
        this._data = 0;
    }
    public get():number{
        return this._data;
    }
    public set(data:number){
        return this._data = data;
    }
}

class registry16{
    private _name:string;

    private _high:registry8;
    private _low:registry8;

    constructor(name:string){
        this._name = name;
        this._high = new registry8(name+"_high")
        this._low = new registry8(name+"_low")
    }

    public get():number{
        return (this._high.get()<<8) | this._low.get();
    }
    public set(data:number){
        this._low.set(data & 0xFF);
        this._high.set(data >> 8);
    }

    public getHigh():registry8{
        return this._high;
    }
    public getLow():registry8{
        return this._low;
    }
}

export {registry8,registry16};