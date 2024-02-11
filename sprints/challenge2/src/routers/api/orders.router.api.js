import { Router } from "express";
//import orders from "../../data/fs/orderFs.manager.js"
import { orders } from "../../data/mongo/manager.mongo.js"; //importo el manager de ordenes


const ordersRouter = Router()

//aca defino los endpoint (post, get, put, delete)
ordersRouter.post("/", async (req,res,next)=>{
  try {
    const data = req.body;
    const response = await orders.create(data);
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

ordersRouter.get("/total/:uid", async(req, res, next)=> {
  try {
    const { uid } = req.params
    const report = await orders.report(uid)
    return res.json({
      statusCode: 200,
      response: report
    })
  } catch (error) {
    throw error
  }
})

ordersRouter.get("/",async (req,res,next)=>{
  try {
    let filter = {}    //este tiene q ser let
    if (req.query.user_id) {
      filter = { user_id: req.query.user_id }

    }
    const all = await orders.read({ filter })
    return res.json({
      statusCode: 200,
      response: all
    })
  } catch (error) {
    return next(error)
  }
})
ordersRouter.get("/:oid",async (req,res,next)=>{
  try {
    const { oid } = req.params;
    const one = orders.readOne(oid);
    return res.status(200).json(one);
  } catch (error) {
    return next(error)  //indica q lo dejo pasar al middleware de errores
  }
})


ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body
    const response = await orders.update(oid, data);
    return res.json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    return next(error);
  }
});


ordersRouter.delete("/:oid",async(req,res)=>{
  try {
    const { oid } = req.params;
    const response = await orders.destroy(oid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
})



export default ordersRouter