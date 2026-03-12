import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";

const clienteController = new ClienteController();
const clienteRoutes = Router();

clienteRoutes.get('/clientes', clienteController.selecionaTodos);

clienteRoutes.post('/clientes', clienteController.adicionarCliente);

clienteRoutes.put('/clientes', clienteController.editarCliente);

clienteRoutes.delete('/clientes', clienteController.deletarCliente);

export default clienteRoutes;