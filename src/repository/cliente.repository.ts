import { db } from "../database/connection.database";
import { Cliente } from "../models/cliente.model";
import { ResultSetHeader } from "mysql2";

export class ClienteRepository {
    async selectTodos(): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM clientes';
        const [rows] = await db.execute<ResultSetHeader>(sql);
        return rows;
    }
    async selectById(id: number): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM clientes WHERE id_cliente = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
    async adicionarCliente(dados: Cliente): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO clientes (nome_cliente, cpf, email_cliente) VALUES (?,?,?);';
        const values = [dados.Nome, dados.Cpf, dados.Email];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async editarCliente(id: number, dados: Cliente): Promise<ResultSetHeader> {
        const sql = 'UPDATE clientes SET nome_cliente = ?, cpf = ?, email_cliente = ? WHERE id_cliente = ?;';
        const values = [dados.Nome, dados.Cpf, dados.Email, id]
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }

    async deletaCliente(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}