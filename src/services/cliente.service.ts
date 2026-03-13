import { ClienteRepository } from "../repository/cliente.repository";
import { Cliente } from "../models/cliente.model";

export class ClienteService {
    constructor(private readonly _repository = new ClienteRepository()) { }

    async selecionarTodos() {
        return await this._repository.selectTodos();
    }

    async selecionarPorId(id: number) {
        return await this._repository.selectById(id);
    }

    async adicionarCliente(nome: string, cpf: string, email: string) {
        const cliente = Cliente.adicionar(nome, cpf, email);
        return await this._repository.adicionarCliente(cliente)
    }

    async editarCliente(id: number, nome: string, cpf: string, email: string) {
        const cliente = Cliente.editar(nome, cpf, email, id)
        return await this._repository.editarCliente(id, cliente)
    }

    async deletarCliente(id: number) {
        return await this._repository.deletaCliente(id)
    }
}