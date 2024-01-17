import { Router } from "express";
import products from "../../data/fs/productFs.manager.js"


const productsRouter = Router()

//aca defino los endpoint (post, get, put, delete)
productsRouter.post("/", async (req,res,next)=>{
  try {
    const data = req.body;
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
    const all = await products.read();
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
productsRouter.get("/:pid",async (req,res,next)=>{
  try {
    const { pid } = req.params;
    const one = products.readOne(pid);
    return res.status(200).json(one);
  } catch (error) {
    return next(error)  //indica q lo dejo pasar al middleware de errores
  }
})
productsRouter.put("/:pid",async (req,res)=>{
  try {
    const { pid } = req.params
    const data = req.body;
    const response = await products.update(pid,data);
    if (response === "Product not found") {
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