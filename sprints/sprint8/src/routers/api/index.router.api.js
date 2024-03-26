import CustomRouter from "../CustomRouter.js";
//import { Router } from "express";

//import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";
//import sessionsRouter from "./sessions.router.api.js";
import UsersRouter from "./users.router.api.js"
import SessionsRouter from "./sessions.router.api.js";
import ProductsRouter from "./products.router.api.js";
import OrdersRouter from "./orders.router.api.js";


const user = new UsersRouter()
const session = new SessionsRouter()
const product = new ProductsRouter()
const order = new OrdersRouter

//const apiRouter = Router()


export default class ApiRouter extends CustomRouter {
  init(){
    this.use("/users",user.getRouter())
    this.use("/products",product.getRouter())
    this.use("/orders",order.getRouter())
    this.use("/sessions",session.getRouter())

  }


}


//definir los enrutadores de los recursos
//apiRouter.use("/users",user.getRouter())
//apiRouter.use("/products",productsRouter)
//apiRouter.use("/orders",ordersRouter)
//apiRouter.use("/sessions",sessionsRouter)


//export default apiRouter
//exporto elenrutador de la api para poder implementarlo en el enrutador del servidor  