import { Router } from "express";
//import users from "../../data/fs/userFs.manager.js"
import { users } from "../../data/mongo/manager.mongo.js";

const usersRouter = Router()

//aca defino los endpoint (post, get, put, delete)
usersRouter.post("/",async (req,res,next)=>{
  try {
    const data = req.body;
    const response = await users.create(data);
    if (response === "user is required") {
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
    return next(error);
  }
})
usersRouter.get("/",async (req,res,next)=>{
  try {
    const filter = {}
    if (req.query.name) {
      filter.name = new RegExp(req.query.name.trim(),'i') 
    }
    // vamos a hacer una ordenacion y paginacion x defecto:
    const orderAndPaginate = {
      limit: req.query.limit || 10,       //q cada pagina tenga 20 documentos
      page: req.query.page || 1,         //q arranque x defecto en la pagina 1
      //sort: { name: 1 }    //q lo ordene x nombre   (si quisiera ordenar x email: sort: { name: 1 })
    }

    /*if (req.query.name==="desc") {        //estos considionales son necesarios para cuando hay q poner en particuplar 
      orderAndPaginate.sort.name = -1
    }*/

    const all = await users.read({filter, orderAndPaginate}); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }


})
usersRouter.get("/:uid",async (req,res,next)=>{
  try {
    const { pid } = req.params;
    const one = await users.readOne(pid);
    return res.status(200).json(one);
  } catch (error) {
    return next(error);
  }
})
usersRouter.put("/:uid",async (req,res,next)=>{
  try {
    const { uid } = req.params
    const data = req.body;
    const response = await users.update(uid,data);
    if (response === "User not found") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response, 
      });
    }
  } catch (error) {
    return next(error)  //indica q lo dejo pasar al middleware de errores
  }
})
usersRouter.delete("/:uid",async (req,res,next)=>{
  try {
    const { uid } = req.params;
    const response = await users.destroy(uid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
})


export default usersRouter 