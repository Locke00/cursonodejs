import { Router } from "express";
import usersRouter from "./users.router.api.js";
import eventsRouter from "./events.router.api.js";
import ordersRouter from "./orders.router.api.js";
import cookiesRouter from "./cookies.router.api.js";
import sessionsRouter from "./sessions.router.api.js";
import passport from "passport";

const apiRouter = Router();

//definir los enrutadores de los recursos
apiRouter.use("/users", usersRouter);
apiRouter.use("/events", passport.authenticate("jwt",{session:false,failureRedirect:"/api/sessions/badauth"}), eventsRouter);
apiRouter.use("/orders", passport.authenticate("jwt",{session:false,failureRedirect:"/api/sessions/badauth"}), ordersRouter);
//el middleware trabajando a nivel del enrutador protege todas las rutas
//(pide autenticacion a todas las rutas de ordenes)
//el agregarle el , passport.authenticate("jwt",{session:false}), hace q solo pueda usar ese enpoint alguien q este loguead


//apiRouter.use("/cookies", cookiesRouter);
//apiRouter.use("/auth", sessionsRouter);   //es mas usado el nombre auth en lugar de sessions, pero nosotros usaremos sessions
apiRouter.use("/sessions", sessionsRouter);

export default apiRouter;
//export el enrutador de la API para poder implementarlo en el enrutador del servidor
