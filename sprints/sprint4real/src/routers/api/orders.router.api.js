import { Router } from "express";
import orders from "../../data/fs/orderFs.manager.js"


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
ordersRouter.get("/",async (req,res,next)=>{
  try {
    const all = await orders.read();
    if (Array.isArray(all)) {
      return res.status(200).json({
        success: true,
        response: all,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return next(error)  //indica q lo dejo pasar al middleware de errores
  }
})
ordersRouter.get("/:pid",async (req,res,next)=>{
  try {
    const { pid } = req.params;
    const one = orders.readOne(pid);
    return res.status(200).json(one);
  } catch (error) {
    return next(error)  //indica q lo dejo pasar al middleware de errores
  }
})
/*ordersRouter.put("/:pid",async (req,res)=>{
  try {
    const { pid } = req.params
    const data = req.body;
    const response = await orders.update(pid,data);
    if (response === "Order not found") {
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



ordersRouter.delete("/:pid",async(req,res)=>{
  try {
    const { pid } = req.params;
    const response = await orders.destroy(pid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
})
*/
export default ordersRouter