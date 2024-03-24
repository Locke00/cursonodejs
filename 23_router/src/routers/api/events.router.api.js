import CustomRouter from "../CustomRouter.js";
//import { Router } from "express";

//import events from "../../data/fs/events.fs.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
//import isAuth from "../../middlewares/isAuth.mid.js";
import { events } from "../../data/mongo/manager.mongo.js";
import propsEvents from "../../middlewares/propsEvents.mid.js";
import passport from "../../middlewares/passport.mid.js";

//const eventsRouter = Router();
export default class EventsRouter extends CustomRouter {
  init() {
    //funcion inicializadora de la extension
    //en lugar de pasar el isAuth, paso la autenticacion de passport jwt
    this.create(
      "/",
      ["ADMIN","PREM"],
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      propsEvents,
      async (req, res, next) => {
        try {
          const data = req.body;
          const response = await events.create(data);
          //return res.json({ statusCode: 201, response });
          return res.success201(response);
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await events.read({ filter, options });
        //return res.json({ statusCode: 200, response: all });
        return res.success200(all);

        //la alternativa q habia hecho yo:
        //const order = { order: req.query.order }         //{ order: undefined }  !== {}  //no es lo mismo
        ////recordar q las consultas o queris SON OPCIONALES. Condicionar correctamente
        //const all = await events.read({ filter , order });
        //return res.json({
        //  statusCode: 200,
        //  response: all,
        //});
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:eid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { eid } = req.params;
        const one = await events.readOne(eid);
        //return res.json({ statusCode: 200, response: one });
        return res.success200(one);
      } catch (error) {
        return next(error);
      }
    });

    this.update("/:eid/:quantity", ["ADMIN","PREM"], async (req, res, next) => {
      try {
        const { eid, quantity } = req.params;
        const response = await events.soldticket(quantity, eid);
        //return res.json({ statusCode: 200, response: "capacity available: " + response  });
        return success200(response);
      } catch (error) {
        return next(error);
      }
    });

    this.destroy("/:eid", ["ADMIN","PREM"], async (req, res, next) => {
      try {
        const { eid } = req.params;
        const response = await events.destroy(eid);
        //return res.json({statusCode: 200, response });
        return success200(response);
      } catch (error) {
        return next(error);
      }
    });
  }
}
