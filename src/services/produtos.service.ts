import { ProdutosRepository } from "../repository/produtos.repository";
import { Produto } from "../models/produtos.model";

export class ProdutosService {
    constructor(private readonly _repository = new ProdutosRepository()) { }

    async selecionarTodos() {
        return await this._repository.selectTodos();
    }

    async selecionarPorId(id: number) {
        return await this._repository.selectById(id);
    }

    async adicionarProduto(Nome: string, valor: number, idCategoria: number, vinculoImagem?: string) {
        const produto = Produto.adicionar(Nome, valor, idCategoria, vinculoImagem);
        return await this._repository.adicionarProduto(produto)
    }

    async editarProduto(Nome: string, valor: number, idCategoria: number, id: number, vinculoImagem?: string) {
        const produto = Produto.editar(Nome, valor, idCategoria,id, vinculoImagem)
        return await this._repository.editarProduto(id, produto)
    }

    async deletarProduto(id: number) {
        return await this._repository.deletarProduto(id)
    }
}