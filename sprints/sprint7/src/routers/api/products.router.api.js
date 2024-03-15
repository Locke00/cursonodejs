import { Router } from "express";
//import products from "../../data/fs/productFs.manager.js"
//import { pdo } from "../../data/mongo/manager.mongo.js";
import { products } from "../../data/mongo/manager.mongo.js";

import isAdmin from "../../middlewares/isAdmin.mid.js"
import isAuth from "../../middlewares/isAuth.mid.js";


const productsRouter = Router()

//aca defino los endpoint (post, get, put, delete)
productsRouter.post("/", isAdmin, async (req,res,next)=>{
  try {
    const data = req.body;
    //console.log(data);
    const response = await products.create(data);
    if (response === "title is required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response, //cuando el nombre de la propiedad es igual al nombre de la variable
                  //directamente pongo el nombre de la variable(a esto se le llama estructuracion)
        //response: response es lo mismo q lo de arriba
        //el codigo 200 envia una respuesta,
        //el codigo 201 no envia ninguna respuesta
      });
    }
  } catch (error) {
    return next(error)  //indica q lo dejo pasar al middleware de errores
  }
})
productsRouter.get("/",async (req,res,next)=>{
  try {
    const filter = {}
/*    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(),'i') 
    }*/
    // vamos a hacer una ordenacion y paginacion x defecto:
    const orderAndPaginate = {
      limit: req.query.limit || 10,       //q cada pagina tenga 20 documentos
      page: req.query.page || 1,         //q arranque x defecto en la pagina 1
      //sort: { title: 1 }    //q lo ordene x nombre   (si quisiera ordenar x email: sort: { name: 1 })
    }

    if (req.query.title==="desc") {        //estos considionales son necesarios para cuando hay q poner en particuplar 
      orderAndPaginate.sort.title = -1
    }

    const all = await products.read({filter, orderAndPaginate}); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort
    return res.json({
      statusCode: 200,
      response: all
    });
  } catch (error) {
    return next(error);
  }

})
productsRouter.get("/:pid",async (req,res,next)=>{
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    //console.log(one);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error)  //indica q lo dejo pasar al middleware de errores
  }
})
productsRouter.put("/:pid",async (req,res)=>{
  try {
    const { pid } = req.params
    const data = req.body;
    const response = await products.update(pid,data);
    return res.json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    return next(error)  //indica q lo dejo pasar al middleware de errores
  }
})



productsRouter.delete("/:pid",async(req,res)=>{
  try {
    const { pid } = req.params;
    const response = await products.destroy(pid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
})

export default productsRouter