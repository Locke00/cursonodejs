import { Router } from "express";
import users from "../../data/fs/userFs.manager.js"

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
    const all = await users.read();
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