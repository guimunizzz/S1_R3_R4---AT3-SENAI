import { Router } from "express";
import { ItensPedidosController } from "../controllers/itensPedidos.controller";

const itensPedidosController = new ItensPedidosController();
const itensPedidosRoutes = Router();

itensPedidosRoutes.get('/itens-pedidos', itensPedidosController.selecionaTodos);
itensPedidosRoutes.post('/itens-pedidos', itensPedidosController.adicionarItem);
itensPedidosRoutes.put('/itens-pedidos', itensPedidosController.editarItem);
itensPedidosRoutes.delete('/itens-pedidos', itensPedidosController.deletarItem);

export default itensPedidosRoutes;
