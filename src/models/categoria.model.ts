export class Categoria  {
    private _descricao: string = '';
    private readonly _id?: number;

    constructor(descricao: string, id?: number) {
        this.Descricao = descricao;
        this._id = id;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Descricao(): string {
        return this._descricao;
    }


    public set Descricao(value: string) {
        this._validarDescricao(value);
        this._descricao = value;
    }


    public static adicionar(Descricao: string): Categoria {
        return new Categoria(Descricao);
    }

    public static editar(Descricao: string, id: number): Categoria {
        return new Categoria(Descricao, id);
    }

    private _validarDescricao(value: string): void {
        if (!value || value.trim().length <= 3) {
            throw new Error('Descricao da categoria deve ter pelo menos 3 caracteres')
        }

        if (value.trim().length > 100) {
            throw new Error('Descricao da categoria deve ter no máximo 100 caracteres')
        }
    }
}