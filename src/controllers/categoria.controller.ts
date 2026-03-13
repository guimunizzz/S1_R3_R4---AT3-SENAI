import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.service";

export class CategoriaController {
    constructor(private readonly _service = new CategoriaService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            if (id) {
                if (Number.isNaN(id) || id <= 0) {
                    return res.status(400).json({
                        message: "ID da categoria inválida ou não fornecido"
                    })
                }
                const resultado = await this._service.selecionarPorId(id);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Categoria não localizada"
                    });
                }
                res.status(200).json({ resultado })
            }
            const categorias = await this._service.selecionarTodos();
            res.status(200).json({ categorias })
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

    adicionarCategoria = async (req: Request, res: Response) => {
        try {
            const { descricao } = req.body;
            const novaCategoria = await this._service.adicionarCategoria(descricao)
            res.status(201).json({ novaCategoria })
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

    editarCategoria = async (req: Request, res: Response) => {
        try {
            const { descricao } = req.body;
            const id = Number(req.query.id);
            const categoriaAlterada = await this._service.editarCategoria(id, descricao);
            res.status(201).json({ categoriaAlterada })
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
    deletarCategoria = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (Number.isNaN(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID da categoria inválida ou não fornecida"
                })
            }

            const categoriaSelecionada = await this._service.selecionarPorId(id)
            if (categoriaSelecionada.affectedRows === 0) {
                return res.status(404).json({
                    message: "Categoria não localizada"
                });
            }

            const resultadoDelete = await this._service.deletarCategoria(id);

            if (resultadoDelete.affectedRows !== 0) {
                return res.status(200).json({
                    message: "Categoria excluida com sucesso",
                    resultado: resultadoDelete
                })
            } else {
                res.status(500).json({
                    message: "Ocorreu um erro ao excluir a categoria"
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