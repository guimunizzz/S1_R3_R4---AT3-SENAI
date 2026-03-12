export class Pedidos {
    private readonly _id?: number;
    private _total: number = 0;
    private readonly _data?: Date;
    private readonly _idCliente: number;
    private readonly _idVendedor: number;

    constructor(total: number, idCliente: number, idVendedor: number, id?: number) {
        this._id = id;
        this.Total = total;
        this._idCliente = idCliente;
        this._idVendedor = idVendedor;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Total(): number {
        return this._total;
    }

    public get IdCliente(): number {
        return this._idCliente;
    }

    public get IdVendedor(): number {
        return this._idVendedor;
    }

    public get Data(): Date | undefined {
        return this._data;
    }


    public set Total(value: number) {
        this._validarTotal(value);
        this._total = value;
    }

    public static criar(Total: number, IdCliente: number, IdVendedor:number): Pedidos {
        return new Pedidos(Total, IdCliente, IdVendedor);
    }

    public static editar(Total: number, IdCliente: number, IdVendedor:number, id: number): Pedidos {
        return new Pedidos(Total, IdCliente, IdVendedor, id);
    }

    private _validarTotal(value: number): void {
        if (Number.isNaN(value)) {
            throw new TypeError('Valor inválido, digite um numero')
        }
    }


}