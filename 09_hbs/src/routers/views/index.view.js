import { Router } from "express";

import eventsRouter from "./events.view.js";
import usersRouter from "./users.view.js"

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  //tengo q agregar el parametro next, para reenviarlo, para usar el errorHandler
  try {
    const mainEvents = ["hp", "pokemon", "batman"];
    const date = new Date();
    return res.render("index",{
      events: mainEvents,
      date//,
      //details: "Detalle de la pagina de inicio",
    }); //devuelvo la vista q tengo q renderizar
    //return res.render("index",{events:mainEvents, date: date) // es lo mismo de arriba con respecto a date, xq uso estructuracion
    //y ademas le pasa como parametro un objeto con los eventos
  } catch (error) {
    next(error); // en el catch tengo q poner next(error), para q sea manejado x el errorHandler
  }
});
viewsRouter.use("/events", eventsRouter);
viewsRouter.use("/users",usersRouter)

 export default viewsRouter;
