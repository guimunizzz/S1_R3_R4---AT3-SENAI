import { Request, Response } from "express";
import { ClienteService } from "../services/cliente.service";

export class ClienteController {
    constructor(private _service = new ClienteService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            if (id) {
                if (Number.isNaN(id) || id <= 0) {
                    return res.status(400).json({
                        message: "ID do cliente inválido ou não fornecido"
                    })
                }
                const resultado = await this._service.selecionarPorId(id);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Cliente não localizado"
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

    adicionarCliente = async (req: Request, res: Response) => {
        try {
            const { nome, cpf, email } = req.body;
            const novoCliente = await this._service.adicionarCliente(nome, cpf, email)
            res.status(201).json({ novoCliente })
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

    editarCliente = async (req: Request, res: Response) => {
        try {
            const { nome, cpf, email } = req.body;
            const id = Number(req.query.id);
            const clienteAlterado = await this._service.editarCliente(id, nome, cpf, email);
            res.status(201).json({ clienteAlterado })
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
    deletarCliente = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (Number.isNaN(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID do cliente inválido ou não fornecido"
                })
            }

            const clienteSelecionado = await this._service.selecionarPorId(id)
            if (clienteSelecionado.affectedRows === 0) {
                return res.status(404).json({
                    message: "Cliente não localizado"
                });
            }

            const resultadoDelete = await this._service.deletarCliente(id);

            if (resultadoDelete.affectedRows !== 0) {
                return res.status(200).json({
                    message: "Cliente excluido com sucesso",
                    resultado: resultadoDelete
                })
            } else {
                res.status(500).json({
                    message: "Ocorreu um erro ao excluir o aluno"
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