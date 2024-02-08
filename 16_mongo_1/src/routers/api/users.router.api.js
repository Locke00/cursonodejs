import { Router } from "express";
//import users from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/", async (req, res, next) => {
  try {
    //mas delanta read va a necesitar un prametro para paginar
    //ordenar y filtrar
    const all = await users.read({}); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readOne(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await users.update(uid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.destroy(uid);
    return res.json({
      statuscode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

//usersRouter.put("/:eid", async(req,res,next)=>{})
//usersRouter.delete("/:eid", async (req, res, next) => {});

export default usersRouter;
