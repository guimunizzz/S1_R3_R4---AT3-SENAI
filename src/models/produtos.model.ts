export class Produto {
    private readonly _id?: number;
    private _nome: string = "";
    private _valor: number = 0;
    private _vinculoImagem: string = "";
    private readonly _idCategoria: number;

    constructor(nome: string, valor: number, idCategoria: number, vinculoImagem?: string, id?: number) {
        this._id = id;
        this.Nome = nome;
        this.Valor = valor;
        this._idCategoria = idCategoria;
        this.VinculoImagem = vinculoImagem;
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

    public get VinculoImagem(): string {
        return this._vinculoImagem;
    }


    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    public set Valor(value: number) {
        this._validarValor(value);
        this._valor = value;
    }

    public set VinculoImagem(value: string | undefined) {
        this._validarVinculoImagem(value);
        this._vinculoImagem = value!;
    }

    public static adicionar(Nome: string, valor: number, idCategoria: number, vinculoImagem?: string): Produto {
        return new Produto(Nome, valor, idCategoria, vinculoImagem);
    }

    public static editar(Nome: string, valor: number, idCategoria: number, id: number, VinculoImagem?:string): Produto {
        return new Produto(Nome, valor, idCategoria, VinculoImagem, id);
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

    private _validarVinculoImagem(value: string | undefined): void {
        if (!value || value.trim().length === 0) {
            throw new Error('Imagem do produto é obrigatória');
        }
    }
}