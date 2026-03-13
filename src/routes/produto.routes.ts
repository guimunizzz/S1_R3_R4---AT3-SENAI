import { Router } from "express";
import { ProdutoController } from "../controllers/produtos.controller";
import uploadImage from "../middlewares/uploadImage.middleware";

const produtoController = new ProdutoController();
const produtoRoutes = Router();

produtoRoutes.get('/produtos', produtoController.selecionaTodos);

produtoRoutes.post('/produtos', uploadImage, produtoController.adicionarProduto);

produtoRoutes.put('/produtos', uploadImage, produtoController.editarProduto);

produtoRoutes.delete('/produtos', produtoController.deletarProduto);

export default produtoRoutes;