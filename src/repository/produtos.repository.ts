import { db } from "../database/connection.database";
import { Produto } from "../models/produtos.model";
import { ResultSetHeader } from "mysql2";

export class CategoriaRepository {
    async selectTodos(): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM produtos';
        const [rows] = await db.execute<ResultSetHeader>(sql);
        return rows;
    }
    async selectById(id: number): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM produtos WHERE id_produto = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}