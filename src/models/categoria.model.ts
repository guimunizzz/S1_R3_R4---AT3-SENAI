export class Categoria  {
    private _nome: string = '';
    private readonly _id?: number;

    constructor(nome: string, id?: number) {
        this.Nome = nome;
        this._id = id;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Nome(): string {
        return this._nome;
    }


    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }


    public static adicionar(Nome: string): Categoria {
        return new Categoria(Nome);
    }

    public static editar(Nome: string, id: number): Categoria {
        return new Categoria(Nome, id);
    }

    private _validarNome(value: string): void {
        if (!value || value.trim().length <= 3) {
            throw new Error('Nome da categoria deve ter pelo menos 3 caracteres')
        }

        if (value.trim().length > 100) {
            throw new Error('Nome da categoria deve ter no máximo 100 caracteres')
        }
    }
}