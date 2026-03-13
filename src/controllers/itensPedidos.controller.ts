import { Request, Response } from "express";
import { ItensPedidosService } from "../services/itensPedidos.service";

export class ItensPedidosController {
    constructor(private readonly _service = new ItensPedidosService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            if (id) {
                if (Number.isNaN(id) || id <= 0) {
                    return res.status(400).json({
                        message: "ID do pedido inválido ou não fornecido"
                    });
                }
                const resultado = await this._service.selecionarPorId(id);
                return res.status(200).json({ resultado });
            }
            const itens = await this._service.selecionarTodos();
            return res.status(200).json({ itens });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                });
            }
            return res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            });
        }
    }

    adicionarItem = async (req: Request, res: Response) => {
        try {
            const { quantidade, valorUnitario, idPedido, idProduto } = req.body;
            const novoItem = await this._service.adicionarItem(quantidade, valorUnitario, idPedido, idProduto);
            return res.status(201).json({ novoItem });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                });
            }
            return res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            });
        }
    }

    editarItem = async (req: Request, res: Response) => {
        try {
            const { quantidade, valorUnitario, idPedido, idProduto } = req.body;
            const id = Number(req.query.id);

            const itemAlterado = await this._service.editarItem(id, idPedido, idProduto, quantidade, valorUnitario);
            return res.status(200).json({ itemAlterado });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                });
            }
            return res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            });
        }
    }
    deletarItem = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (Number.isNaN(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID do item inválido ou não fornecido"
                })
            }

            const itemSelecionado = await this._service.selecionarPorId(id)
            if (itemSelecionado.affectedRows === 0) {
                return res.status(404).json({
                    message: "Item não localizado"
                });
            }

            const resultadoDelete = await this._service.deletarItem(id);

            if (resultadoDelete.affectedRows === 0) {
                return res.status(500).json({
                    message: "Ocorreu um erro ao excluir o item"
                });
            }

            return res.status(200).json({
                message: "Item excluido com sucesso",
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
