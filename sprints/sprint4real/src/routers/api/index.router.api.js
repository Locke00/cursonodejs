import { Router } from "express";

import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";

const apiRouter = Router()

//definir los enrutadores de los recursos
apiRouter.use("/users",usersRouter)
apiRouter.use("/products",productsRouter)


export default apiRouter
//exporto elenrutador de la api para poder implementarlo en el enrutador del servidor 