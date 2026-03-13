import { ItensPedidos } from "../models/itensPedido.model";
import { ItensPedidosRepository } from "../repository/itensPedidos.repository";
import { PedidosRepository } from "../repository/pedidos.repository";

export class ItensPedidosService {
    constructor(
        private readonly _repository = new ItensPedidosRepository(),
        private readonly _pedidosRepository = new PedidosRepository()
    ) { }

    async selecionarTodos() {
        return await this._repository.selectTodos();
    }

    async selecionarPorId(id: number) {
        return await this._repository.selectById(id);
    }

    async adicionarItem(Quantidade: number, ValorUnitario: number, IdPedido: number, IdProduto: number) {
        const item = ItensPedidos.criar(Quantidade, ValorUnitario, IdPedido, IdProduto);
        const resultado = await this._repository.adicionarItem(item);
        await this._pedidosRepository.atualizarTotalPedido(IdPedido);
        return resultado;
    }

    async editarItem(id:number, idPedido: number, idProduto: number, Quantidade: number, ValorUnitario: number) {
        const item = ItensPedidos.editar(Quantidade, ValorUnitario, idPedido, idProduto);
        const resultado = await this._repository.editarItem(id, item);
        await this._pedidosRepository.atualizarTotalPedido(idPedido);
        return resultado;
    }

    async deletarItem(id: number) {
        return await this._repository.deletarItem(id)
    }
}
