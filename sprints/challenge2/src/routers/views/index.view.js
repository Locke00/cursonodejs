import { Router } from "express";
//import productsManager from "../../data/fs/productFs.manager.js";
import { products } from "../../data/mongo/manager.mongo.js";

import registerRouter from "./register.view.js";
import formRouter from "./form.view.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  //tengo q agregar el parametro next, para reenviarlo, para usar el errorHandler
  try {
    const filter = {};
    const orderAndPaginate = {
      limit: req.query.limit || 10, //q cada pagina tenga 20 documentos
      page: req.query.page || 1, //q arranque x defecto en la pagina 1
    };

    if (req.query.title === "desc") {
      //estos considionales son necesarios para cuando hay q poner en particuplar
      orderAndPaginate.sort.title = -1;
    }

    const all = await products.read({ filter, orderAndPaginate }); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort

    const listaProductosString = JSON.stringify(all.docs);
    const listaProductos = JSON.parse(listaProductosString);

    //const listaProductos2 = Array.from(listaProductos)

    const date = new Date();
    //console.log(products);
    return res.render("index", { listaProductos, date }); //devuelvo la vista q tengo q renderizar
    // el 1er parametro es la vista, dsp va un objeto vacio
  } catch (error) {
    next(error); // en el catch tengo q poner next(error), para q sea manejado x el errorHandler
  }
});

viewsRouter.get("/real", (req, res, next) => {
  try {
    return res.render("real", { title: "REAL" });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/register", registerRouter);
viewsRouter.get("/form", (req, res, next) => {
  try {
    return res.render("form", { title: "Form" });
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;
