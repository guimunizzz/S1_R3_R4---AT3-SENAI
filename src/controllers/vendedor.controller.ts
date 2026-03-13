import { Request, Response } from "express";
import { VendedorService } from "../services/vendedor.service";

export class VendedorController {
    constructor(private readonly _service = new VendedorService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            if (id) {
                if (Number.isNaN(id) || id <= 0) {
                    return res.status(400).json({
                        message: "ID do vendedor inválido ou não fornecido"
                    })
                }
                const resultado = await this._service.selecionarPorId(id);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Vendedor não localizado"
                    });
                }
                res.status(200).json({ resultado })
            }
            const clientes = await this._service.selecionarTodos();
            res.status(200).json({ clientes })
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

    adicionarVendedor = async (req: Request, res: Response) => {
        try {
            const { nome, matricula, email } = req.body;
            const novoVendedor = await this._service.adicionarVendedor(nome, matricula, email)
            res.status(201).json({ novoVendedor })
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

    editarVendedor = async (req: Request, res: Response) => {
        try {
            const { nome, matricula, email } = req.body;
            const id = Number(req.query.id);
            const vendedorAlterado = await this._service.editarVendedor(id, nome, matricula, email);
            res.status(201).json({ vendedorAlterado })
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
    deletarVendedor = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (Number.isNaN(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID do vendedor inválido ou não fornecido"
                })
            }

            const vendedorSelecionado = await this._service.selecionarPorId(id)
            if (vendedorSelecionado.affectedRows === 0) {
                return res.status(404).json({
                    message: "Vendedor não localizado"
                });
            }

            const resultadoDelete = await this._service.deletarVendedor(id);

            if (resultadoDelete.affectedRows !== 0) {
                return res.status(200).json({
                    message: "Vendedor excluido com sucesso",
                    resultado: resultadoDelete
                })
            } else {
                res.status(500).json({
                    message: "Ocorreu um erro ao excluir o vendedor"
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