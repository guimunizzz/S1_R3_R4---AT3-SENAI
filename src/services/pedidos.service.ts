import { Pedidos } from "../models/pedidos.model";
import { PedidosRepository } from "../repository/pedidos.repository";

export class PedidosService {
	constructor(private readonly _repository = new PedidosRepository()) { }

	async selecionarTodos() {
		return await this._repository.selectTodos();
	}

	async selecionarPorId(id: number) {
		return await this._repository.selectById(id);
	}

	async adicionarPedido(IdCliente: number, IdVendedor: number, Total = 0) {
		const pedido = Pedidos.criar(Total, IdCliente, IdVendedor);
		return await this._repository.adicionarPedido(pedido);
	}

	async editarPedido(id: number, Total: number, IdCliente: number, IdVendedor: number) {
		const pedido = Pedidos.editar(Total, IdCliente, IdVendedor, id);
		return await this._repository.editarPedido(id, pedido);
	}

	async deletarPedido(id: number) {
		return await this._repository.deletarPedido(id);
	}

	async atualizarTotalPedido(idPedido: number) {
		return await this._repository.atualizarTotalPedido(idPedido);
	}
}
