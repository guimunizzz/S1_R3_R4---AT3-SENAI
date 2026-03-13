import { Request, Response } from "express";
import { PedidosService } from "../services/pedidos.service";

export class PedidosControllers {
    constructor(private _service = new PedidosService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            if (id) {
                if (Number.isNaN(id) || id <= 0) {
                    return res.status(400).json({
                        message: "ID do pedido inválido ou não fornecido"
                    })
                }
                const resultado = await this._service.selecionarPorId(id);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Pedido não localizado"
                    });
                }
                res.status(200).json({ resultado })
            }
            const pedidos = await this._service.selecionarTodos();
            res.status(200).json({ pedidos })
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

    adicionarPedido = async (req: Request, res: Response) => {
        try {
            const { id_cliente, id_vendedor } = req.body;
            const novoPedido = await this._service.adicionarPedido(id_cliente, id_vendedor);
            res.status(201).json({ novoPedido });
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

    editarPedido = async (req: Request, res: Response) => {
        try {
            const { total, id_cliente, id_vendedor } = req.body;
            const id = Number(req.query.id);
            const pedidoAlterado = await this._service.editarPedido(id, total, id_cliente, id_vendedor);
            res.status(201).json({ pedidoAlterado })
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
    deletarPedido = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (Number.isNaN(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID do pedido inválido ou não fornecido"
                })
            }

            const pedidoSelecionado = await this._service.selecionarPorId(id)
            if (pedidoSelecionado.affectedRows === 0) {
                return res.status(404).json({
                    message: "Pedido não localizado"
                });
            }

            const resultadoDelete = await this._service.deletarPedido(id);

            if (resultadoDelete.affectedRows === 0) {
                return res.status(500).json({
                    message: "Ocorreu um erro ao excluir o pedido"
                });
            }

            return res.status(200).json({
                message: "Pedido excluido com sucesso",
                resultado: resultadoDelete
            })
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