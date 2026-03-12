import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";

const categoriaController = new CategoriaController();
const categoriaRoutes = Router();

categoriaRoutes.get('/categorias', categoriaController.selecionaTodos);

categoriaRoutes.post('/categorias', categoriaController.adicionarCategoria);

categoriaRoutes.put('/categorias', categoriaController.editarCategoria);

categoriaRoutes.delete('/categorias', categoriaController.deletarCategoria);

export default categoriaRoutes;