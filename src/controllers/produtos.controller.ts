import { Request, Response } from "express";
import fs from 'fs';
import { type } from "os";
import path from 'path';
import { ProdutosService } from "../services/produtos.service";

export class ProdutoController {
    constructor(private _service = new ProdutosService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            if (id) {
                if (Number.isNaN(id) || id <= 0) {
                    return res.status(400).json({
                        message: "ID do produto inválido ou não fornecido"
                    })
                }
                const resultado = await this._service.selecionarPorId(id);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Produto não localizado"
                    });
                }
                res.status(200).json({ resultado })
            }
            const produtos = await this._service.selecionarTodos();
            res.status(200).json({ produtos })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }

    adicionarProduto = async (req: Request, res: Response) => {
        try {
            const { nome, valor, idCategoria } = req.body;

            const vinculoImagem = req.file?.filename;
            const novoProduto = await this._service.adicionarProduto(nome, valor, idCategoria, vinculoImagem)
            

            res.status(201).json({ novoProduto })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }

    editarProduto = async (req: Request, res: Response) => {
        try {
            const { nome, valor, idCategoria } = req.body;
            const id = Number(req.query.id);

            const vinculoImagem = req.file?.filename;

            const produtoAlterado = await this._service.editarProduto(nome, valor, idCategoria, id, vinculoImagem);
            res.status(201).json({ produtoAlterado })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }
    deletarProduto = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (Number.isNaN(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID do produto inválido ou não fornecido"
                })
            }

            const produtoSelecionado = await this._service.selecionarPorId(id)
            if (produtoSelecionado.affectedRows === 0) {
                return res.status(404).json({
                    message: "Produto não localizado"
                });
            }

            const resultadoDelete = await this._service.deletarProduto(id);

            if (resultadoDelete.affectedRows !== 0) {
                return res.status(200).json({
                    message: "Produto excluido com sucesso",
                    resultado: resultadoDelete
                })
            } else {
                res.status(500).json({
                    message: "Ocorreu um erro ao excluir o produto"
                });
            }
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }
}