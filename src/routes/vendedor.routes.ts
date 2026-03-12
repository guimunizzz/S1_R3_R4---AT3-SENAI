import { Router } from "express";
import { VendedorController } from "../controllers/vendedor.controller";

const vendedorController = new VendedorController();
const vendedorRoutes = Router();

vendedorRoutes.get('/vendedores', vendedorController.selecionaTodos);

vendedorRoutes.post('/vendedores', vendedorController.adicionarVendedor);

vendedorRoutes.put('/vendedores', vendedorController.editarVendedor);

vendedorRoutes.delete('/vendedores', vendedorController.deletarVendedor);

export default vendedorRoutes;