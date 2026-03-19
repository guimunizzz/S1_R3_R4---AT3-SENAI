export class ItensPedidos {
    private _quantidade: number = 0;
    private _valorUnitario: number = 0;
    private readonly _idPedido: number;
    private readonly _idProduto: number;

    constructor(quantidade: number, valorUnitario: number, idPedido: number, idProduto: number) {
        this.Quantidade = quantidade;
        this.ValorUnitario = valorUnitario;
        this._idPedido = idPedido;
        this._idProduto = idProduto;
    }

    public get Quantidade(): number {
        return this._quantidade;
    }

    public get ValorUnitario(): number {
        return this._valorUnitario;
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

    public set ValorUnitario(value: number) {
        this._validarValorUnitario(value);
        this._valorUnitario = value;
    }

    public static criar(Quantidade: number, ValorUnitario: number, IdPedido: number, IdProduto: number): ItensPedidos {
        return new ItensPedidos(Quantidade, ValorUnitario, IdPedido, IdProduto);
    }

    public static editar(Quantidade: number, ValorUnitario: number, IdPedido: number, IdProduto: number): ItensPedidos {
        return new ItensPedidos(Quantidade, ValorUnitario, IdPedido, IdProduto);
    }

    private _validarQuantidade(value: number): void {
        if (Number.isNaN(value) || value <= 0) {
            throw new TypeError(`Quantidade inválido, deve ser um número maior que zero`);
        }
    }
    private _validarValorUnitario(value: number): void {
        if (Number.isNaN(value) || value <= 0) {
            throw new TypeError(`Valor inválido, deve ser um número maior que zero`);
        }
    }
}