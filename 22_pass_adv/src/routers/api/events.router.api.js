import { Router } from "express";
//import events from "../../data/fs/events.fs.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import { events } from "../../data/mongo/manager.mongo.js";
import propsEvents from "../../middlewares/propsEvents.mid.js";

const eventsRouter = Router();

eventsRouter.post("/", isAdmin, propsEvents, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await events.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {  
    return next(error);Z
  }
});

eventsRouter.get("/", async (req, res, next) => {
  try {
    const filter = { category: req.query.category }  //{category: undefined} !== {}  //no es lo mismo
    const order = { order: req.query.order }         //{ order: undefined }  !== {}  //no es lo mismo
    //recordar q las consultas o queris SON OPCIONALES. Condicionar correctamente
    const all = await events.read({ filter , order });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

eventsRouter.get("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const one = await events.readOne(eid);
    return res.json({
      statusCode: 200,
      response: one,
    });
   } catch (error) {
    return next(error);
  }
});

eventsRouter.put("/:eid/:quantity", async (req, res, next) => {
  try {
    const { eid, quantity } = req.params;
    const response = await events.soldticket(quantity, eid);
    return res.json({
      statusCode: 200,
      response: "capacity available: " + response,
    });
  } catch (error) {
    return next(error);
  }
});

eventsRouter.delete("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const response = await events.destroy(eid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default eventsRouter;
