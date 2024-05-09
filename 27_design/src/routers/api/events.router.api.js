import CustomRouter from "../CustomRouter.js";
//import { Router } from "express";

//import events from "../../data/fs/events.fs.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
//import isAuth from "../../middlewares/isAuth.mid.js";
//import { events } from "../../data/mongo/manager.mongo.js";
import propsEvents from "../../middlewares/propsEvents.mid.js";
import passport from "../../middlewares/passport.mid.js";
import { create, read, readOne, update, destroy} from "../../controllers/events.controller.js";

//const eventsRouter = Router();
class EventsRouter extends CustomRouter {
  init() {
    //funcion inicializadora de la extension
    //en lugar de pasar el isAuth, paso la autenticacion de passport jwt
    this.create(
      "/",  //la ruta del endpoint
      ["ADMIN","PREM"],  //la politica
      //passport.authenticate("jwt", { session: false }),
      //passCallBackMid("jwt"),  //reemplazar x el de arriba
      create   // el controlador
    );
    this.read("/", ["PUBLIC"], read);
    this.read("/:eid", ["PUBLIC"], readOne);
    this.update("/:eid/:quantity", ["ADMIN","PREM"], update);
    this.destroy("/:eid", ["ADMIN","PREM"], destroy);
  }
}

const eventsRouter = new EventsRouter()
export default eventsRouter.getRouter()
