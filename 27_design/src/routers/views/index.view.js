//import { Router } from "express";
import CustomRouter from "../CustomRouter.js";

import eventsRouter from "./events.view.js";
import usersRouter from "./users.view.js";
import sessionsRouter from "./sessions.view.js";
import events from "../../data/fs/events.fs.js";

//const viewsRouter = Router();
export default class ViewsRouter extends CustomRouter {// ViewsRouter en mayuscula xq es la clase
  init() {
    this.router.use("/events", eventsRouter);
    this.router.use("/users", usersRouter);
    this.router.use("/sessions", sessionsRouter);

    //viewsRouter.get("/",     ->     this.read("/", 
    this.read("/",["PUBLIC"], (req, res, next) => { //aqui cambio el get x el read
      try {   
        const date = new Date();
        const all = events.readEvents();
        return res.render("index", { events: all, date, title: "HOME" });
      } catch (error) {
        next(error);
      }
    });
    
    
  }
  

}


//export default viewsRouter;



/*
//funcion profe, q vendria a ser el read 
viewsRouter.get("/", async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 4,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true
    };
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.sort === "desc") {
      options.sort.title = "desc";
    }
    const all = await events.read({ filter, options });
    return res.render("index", {
      events: all.docs,
      next: all.nextPage,
      prev: all.prevPage,
      title: "INDEX",
      filter: req.query.title,
    });
  } catch (error) {
    next(error);
  }
});
*/