import { Router } from "express";
import eventsRouter from "./events.router.api.js";

const apiRouter = Router()

//definir los enrutadores de los recursos
apiRouter.use("/events",eventsRouter)
export default apiRouter









