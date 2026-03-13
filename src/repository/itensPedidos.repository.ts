import { db } from "../database/connection.database";
import { ItensPedidos } from "../models/itensPedido.model";
import { ResultSetHeader } from "mysql2";

export class ItensPedidosRepository {
    async selectTodos(): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM Itens_Pedidos';
        const [rows] = await db.execute<ResultSetHeader>(sql);
        return rows;
    }

    async selectById(id: number): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM Itens_Pedidos WHERE id_item = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async adicionarItem(dados: ItensPedidos): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO Itens_Pedidos (id_pedidoFK, id_produtoFK, quantidade, valorUnitario) VALUES (?,?,?,?);';
        const values = [dados.IdPedido, dados.IdProduto, dados.Quantidade, dados.ValorUnitario];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async editarItem(id:number, dados: ItensPedidos): Promise<ResultSetHeader> {
        const sql = 'UPDATE Itens_Pedidos SET id_pedidoFK = ?, id_produtoFK = ?, quantidade = ?, valorUnitario = ? WHERE id_item = ?;';
        const values = [dados.IdPedido, dados.IdProduto, dados.Quantidade, dados.ValorUnitario, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async deletarItem(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM Itens_Pedidos WHERE id_item = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}