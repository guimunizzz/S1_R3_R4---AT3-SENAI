export class Produto {
    private readonly _id?: number;
    private _nome: string = "";
    private _valor: number = 0;
    private readonly _idCategoria: number;

    constructor(nome: string, valor: number, idCategoria: number, id?: number) {
        this._id = id;
        this.Nome = nome;
        this.Valor = valor;
        this._idCategoria = idCategoria
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Nome(): string {
        return this._nome;
    }

    public get Valor(): number {
        return this._valor;
    }

    public get IdCategoria(): number {
        return this._idCategoria;
    }


    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }
    public set Valor(value: number) {
        this._validarValor(value);
        this._valor = value;
    }

    public static criar(Nome: string, valor: number, idCategoria: number): Produto {
        return new Produto(Nome, valor, idCategoria);
    }

    public static editar(Nome: string, valor: number, idCategoria: number, id: number): Produto {
        return new Produto(Nome, valor, idCategoria, id);
    }



    private _validarNome(value: string): void {
        if (!value || value.trim().length <= 3) {
            throw new Error('Nome do produto deve ter pelo menos 3 caracteres')
        }

        if (value.trim().length > 45) {
            throw new Error('Nome do produto deve ter no máximo 45 caracteres')
        }
    }
    private _validarValor(value: number): void {
        if (Number.isNaN(value)) {
            throw new TypeError('Valor inválido, digite um numero')
        }
    }
}