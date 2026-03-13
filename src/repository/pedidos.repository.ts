import { db } from "../database/connection.database";
import { Pedidos } from "../models/pedidos.model";
import { ResultSetHeader } from "mysql2";


export class PedidosRepository {
	async selectTodos(): Promise<ResultSetHeader> {
		const sql = 'SELECT * FROM pedidos';
		const [rows] = await db.execute<ResultSetHeader>(sql);
		return rows;
	}

	async selectById(id: number): Promise<ResultSetHeader> {
		const sql = 'SELECT * FROM pedidos WHERE id_pedido = ?';
		const values = [id];
		const [rows] = await db.execute<ResultSetHeader>(sql, values);
		return rows;
	}

	async adicionarPedido(dados: Pedidos): Promise<ResultSetHeader> {
		const sql = 'INSERT INTO pedidos (valorTotal, id_clienteFK, id_vendedorFK) VALUES (?,?,?);';
		const values = [dados.Total, dados.IdCliente, dados.IdVendedor];
		const [rows] = await db.execute<ResultSetHeader>(sql, values);
		return rows;
	}

	async editarPedido(id: number, dados: Pedidos): Promise<ResultSetHeader> {
		const sql = 'UPDATE pedidos SET valorTotal = ?, id_clienteFK = ?, id_vendedorFK = ? WHERE id_pedido = ?;';
		const values = [dados.Total, dados.IdCliente, dados.IdVendedor, id];
		const [rows] = await db.execute<ResultSetHeader>(sql, values);
		return rows;
	}

	async deletarPedido(id: number): Promise<ResultSetHeader> {
		const sql = 'DELETE FROM pedidos WHERE id_pedido = ?';
		const values = [id];
		const [rows] = await db.execute<ResultSetHeader>(sql, values);
		return rows;
	}

	async atualizarTotalPedido(idPedido: number): Promise<ResultSetHeader> {
		const sql = 'UPDATE pedidos SET valorTotal = calcular_total_pedido(?) WHERE id_pedido = ?';
		const values = [idPedido, idPedido];
		const [rows] = await db.execute<ResultSetHeader>(sql, values);
		return rows;
	}
}
