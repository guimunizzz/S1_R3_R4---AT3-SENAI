abstract class Pessoa {
    constructor(protected _nome: string, protected _email: string, protected readonly _id?: number) { }
}

export class Vendedor extends Pessoa {
    private _matricula: string = '';

    constructor(_nome: string, _email: string, matricula: string, _id?: number) {
        super(_nome, _email, _id);
        this.Nome = _nome;
        this.Email = _email;
        this.Matricula = matricula;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Nome(): string {
        return this._nome;
    }

    public get Email(): string {
        return this._email;
    }

    public get Matricula(): string {
        return this._matricula;
    }


    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    public set Email(value: string) {
        this._validarEmail(value);
        this._email = value;
    }

    public set Matricula(value: string) {
        this._validarMatricula(value);
        this._matricula = value;
    }



    public static adicionar(Nome: string, Email: string, Matricula: string): Vendedor {
        return new Vendedor(Nome, Email, Matricula);
    }

    public static editar(Nome: string, Email: string, Matricula: string, id: number): Vendedor {
        return new Vendedor(Nome, Email, Matricula, id);
    }



    private _validarNome(value: string): void {
        if (!value || value.trim().length <= 3) {
            throw new Error('Nome do cliente deve ter pelo menos 3 caracteres')
        }

        if (value.trim().length > 100) {
            throw new Error('Nome do cliente deve ter no máximo 100 caracteres')
        }
    }

    private _validarEmail(value: string): void {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(value)) {
            throw new Error('Email invalido, siga o padrão: exemplo@gmail.com')
        }
    }

    private _validarMatricula(value: string): void {
        if (!value || value.trim()?.length != 5) {
            throw new Error('A matricula precisa ter 5 caracteres')
        }
        if (typeof value !== 'string') {
            throw new TypeError('Matricula no formato incorreto, deve ser um texto!')
        }
    }
}