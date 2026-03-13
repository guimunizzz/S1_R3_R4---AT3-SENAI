import { Router } from "express";
import { PedidosControllers } from "../controllers/pedidos.controller";

const pedidosController = new PedidosControllers();
const pedidosRoutes = Router();

pedidosRoutes.get('/pedidos', pedidosController.selecionaTodos);
pedidosRoutes.post('/pedidos', pedidosController.adicionarPedido);
pedidosRoutes.put('/pedidos', pedidosController.editarPedido);
pedidosRoutes.delete('/pedidos', pedidosController.deletarPedido);

export default pedidosRoutes;
