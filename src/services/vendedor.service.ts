import { VendedorRepository } from "../repository/vendedor.repository";
import { Vendedor } from "../models/vendedor.model";

export class VendedorService {
    constructor(private _repository = new VendedorRepository()) { }

    async selecionarTodos() {
        return await this._repository.selectTodos();
    }

    async selecionarPorId(id: number) {
        return await this._repository.selectById(id);
    }

    async adicionarVendedor(nome: string, matricula: string, email: string) {
        const vendedor = Vendedor.adicionar(nome, matricula, email);
        return await this._repository.adicionarVendedor(vendedor)
    }

    async editarVendedor(id: number, nome: string, matricula: string, email: string) {
        const vendedor = Vendedor.editar(nome, matricula, email, id)
        return await this._repository.editarVendedor(id, vendedor)
    }

    async deletarVendedor(id: number) {
        return await this._repository.deletarVendedor(id)
    }
}