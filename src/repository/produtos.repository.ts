import { db } from "../database/connection.database";
import { Produto } from "../models/produtos.model";
import { ResultSetHeader } from "mysql2";

export class ProdutosRepository {
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
    async adicionarProduto(dados: Produto): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO produtos (nome, valorProduto, id_categoriaFK, vinculo_imagem) VALUES (?,?,?,?);';
        const values = [dados.Nome, dados.Valor, dados.IdCategoria, dados.VinculoImagem];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async editarProduto(id: number, dados: Produto): Promise<ResultSetHeader> {
        const sql = 'UPDATE produtos SET nome = ?, valorProduto = ?, id_categoriaFK = ?, vinculo_imagem = ? WHERE id_produto = ?;';
        const values = [dados.Nome, dados.Valor, dados.IdCategoria, dados.VinculoImagem, id]
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }

    async deletarProduto(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM produtos WHERE id_produto = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}