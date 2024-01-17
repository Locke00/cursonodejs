import { Router } from "express";
import productsManager from "../../data/fs/productFs.manager.js";

import registerRouter from "./register.view.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  //tengo q agregar el parametro next, para reenviarlo, para usar el errorHandler
  try {
    const products = productsManager.read();
    const date = new Date();
    return res.render("index", { products, date }); //devuelvo la vista q tengo q renderizar
    // el 1er parametro es la vista, dsp va un objeto vacio
  } catch (error) {
    next(error); // en el catch tengo q poner next(error), para q sea manejado x el errorHandler
  }
});
viewsRouter.use("/register", registerRouter);

export default viewsRouter;
