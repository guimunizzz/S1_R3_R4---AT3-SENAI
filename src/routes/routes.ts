import { Router } from "express";
import clienteRoutes from "./cliente.routes";
import vendedorRoutes from "./vendedor.routes";
import categoriaRoutes from "./categoria.routes";
import produtoRoutes from "./produto.routes";
import pedidosRoutes from "./pedidos.routes";
import itensPedidosRoutes from "./itensPedidos.routes";

const router = Router()

router.use('/', clienteRoutes)
router.use('/', vendedorRoutes)
router.use('/', categoriaRoutes)
router.use('/', produtoRoutes)
router.use('/', pedidosRoutes)
router.use('/', itensPedidosRoutes)

export default router;