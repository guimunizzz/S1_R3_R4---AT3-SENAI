abstract class Pessoa {
    constructor(protected _nome: string, protected _email: string, protected readonly _id?: number) { }
}

export class Cliente extends Pessoa {
    private _cpf: string = '';

    constructor(_nome: string, cpf: string, _email: string, _id?: number) {
        super(_nome, _email, _id);
        this.Nome = _nome;
        this.Email = _email;
        this.Cpf = cpf;
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

    public get Cpf(): string {
        return this._cpf;
    }


    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    public set Email(value: string) {
        this._validarEmail(value);
        this._email = value;
    }

    public set Cpf(value: string) {
        this._validarCpf(value);
        this._cpf = value;
    }



    public static adicionar(Nome: string, Email: string, Cpf: string): Cliente {
        return new Cliente(Nome, Email, Cpf);
    }

    public static editar(Nome: string, Email: string, Cpf: string, id: number): Cliente {
        return new Cliente(Nome, Email, Cpf, id);
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

    private _validarCpf(value: string): void {
        if (!value || value?.trim().length != 11) {
            throw new Error('CPF só precisa ter 11 caracteres, siga o padrão apenas com numeros: 12345678900')
        }
    }
}