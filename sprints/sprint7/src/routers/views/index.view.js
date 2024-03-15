
//import {BSON} = require('bson')
import { Router } from "express";
//import productsManager from "../../data/fs/productFs.manager.js";
import { products } from "../../data/mongo/manager.mongo.js";

//import registerRouter from "./register.view.js";
import formRouter from "./form.view.js";
import sessionsRouter from "./sessions.view.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  //tengo q agregar el parametro next, para reenviarlo, para usar el errorHandler
  try {
    const filter = {};
    const orderAndPaginate = {
      limit: req.query.limit || 4, //q cada pagina tenga 20 documentos
      page: req.query.page || 1, //q arranque x defecto en la pagina 1
    };

    /*if (req.query.title === "desc") {
      //estos considionales son necesarios para cuando hay q poner en particuplar
      orderAndPaginate.sort.title = -1;
    }*/
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.sort === "desc") {
      options.sort.title = "desc";
    }

    const allBSON = await products.read({ filter, orderAndPaginate }); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort

    const allBSONstr = JSON.stringify(allBSON);
    const all = JSON.parse(allBSONstr);  //queda el objeto en formato json

    //console.log(all);
    return res.render("index", {
      listaProductos: all.docs,
      next: all.nextPage,
      prev: all.prevPage,
      title: "INDEX",
      filter: req.query.title,
    });

    
/*este bloque lo reemplazo
    const listaProductosString = JSON.stringify(all.docs);
    const listaProductos = JSON.parse(listaProductosString);

    //const listaProductos2 = Array.from(listaProductos)

    const date = new Date();
    //console.log(products);
    return res.render("index", { listaProductos, date }); //devuelvo la vista q tengo q renderizar
    // el 1er parametro es la vista, dsp va un objeto vacio
*/



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

//viewsRouter.use("/auth/register", registerRouter);
viewsRouter.get("/products/form", (req, res, next) => {
  try {
    return res.render("form", { title: "Form" });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/auth", sessionsRouter);


viewsRouter.get("/orders", (req, res, next) => {
  try {
    return res.render("orders", { title: "Orders" });
  } catch (error) {
    next(error);
  }
});


export default viewsRouter;
