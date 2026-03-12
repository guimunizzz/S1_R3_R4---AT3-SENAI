export class ItensPedidos {
    private _quantidade: number = 0;
    private readonly _idPedido: number;
    private readonly _idProduto: number;

    constructor(quantidade: number, idPedido: number, idProduto: number) {
        this.Quantidade = quantidade;
        this._idPedido = idPedido;
        this._idProduto = idProduto
    }

    public get Quantidade(): number {
        return this._quantidade;
    }

    public get IdPedido(): number {
        return this._idPedido;
    }

    public get IdProduto(): number {
        return this._idProduto;
    }

    public set Quantidade(value: number) {
        this._validarQuantidade(value);
        this._quantidade = value;
    }



    public static criar(Quantidade: number, IdPedido: number, IdProduto:number): ItensPedidos {
        return new ItensPedidos(Quantidade, IdPedido, IdProduto);
    }

    public static editar(Quantidade: number, IdPedido: number, IdProduto:number): ItensPedidos {
        return new ItensPedidos(Quantidade, IdPedido, IdProduto);
    }

    private _validarQuantidade(value: number): void {
        if (Number.isNaN(value)) {
            throw new TypeError('Valor inválido, digite um numero')
        }
    }


}