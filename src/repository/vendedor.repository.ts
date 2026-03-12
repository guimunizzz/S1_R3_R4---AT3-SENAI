import { db } from "../database/connection.database";
import { Vendedor } from "../models/vendedor.model";
import { ResultSetHeader } from "mysql2";

export class VendedorRepository {
    async selectTodos(): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM Vendedores';
        const [rows] = await db.execute<ResultSetHeader>(sql);
        return rows;
    }

    async selectById(id: number): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM Vendedores WHERE id_vendedor = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async adicionarVendedor(dados: Vendedor): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO Vendedores (nome_vendedor, matricula, email_vendedor) VALUES (?,?,?);';
        const values = [dados.Nome, dados.Matricula, dados.Email];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async editarVendedor(id: number, dados: Vendedor): Promise<ResultSetHeader> {
        const sql = 'UPDATE Vendedores SET nome_vendedor = ?, matricula = ?, email_vendedor = ? WHERE id_vendedor = ?;';
        const values = [dados.Nome, dados.Matricula, dados.Email, id]
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }

    async deletarVendedor(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM Vendedores WHERE id_vendedor = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}