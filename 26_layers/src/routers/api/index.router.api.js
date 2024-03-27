import { fork } from "child_process";
import CustomRouter from "../CustomRouter.js";
import { Router } from "express";
import usersRouter from "./users.router.api.js";
//import eventsRouter from "./events.router.api.js";
import ordersRouter from "./orders.router.api.js";
import cookiesRouter from "./cookies.router.api.js";
import sessionsRouter from "./sessions.router.api.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import eventsRouter from "./events.router.api.js";
import commentsRouter from "./comments.router.api.js";
//import sum from "../../utils/sum.util.js"

//const apiRouter = Router();


export default class ApiRouter extends CustomRouter {
  init(){       
    this.use("/events", eventsRouter)
    this.use("/comments", commentsRouter)
    this.use("/users", usersRouter)   //le agrego a /users, todas las rutas de usersRouter
    this.use("/orders", ordersRouter) // asi como puse passCallBackMid, 

    this.use("/sessions", sessionsRouter)         //puedo agregarle todos los middlewares q quiera

    this.read("/sum", ["PUBLIC"], async (req, res,next) => {  //esta cb no es necesario q sea asincrona
      try {
        console.log("global process id: "+process.pid);
        const child = fork("./src/utils/sum.util.js");  //crea un hijo
        child.send("start");  //activo el proceso hijo, le tengo q enviar el mensaje start
        child.on("message", result => res.success200(result));  //para recibir un mensaje del hijo.
            //espera la respuesta del hijo, y recien ejecuta el callback
        //const child1 = fork("./src/utils/sum.util.js");
        //const child2 = fork("./src/utils/subtract.util.js");
        //child1.send("start");
        //child2.send("start");
        //const results = {}
        //child1.on("message", (result) => results.sum = result);
        //child2.on("message", (result) => results.substract = result);
        //return res.success200(results)

        //cuando se llama sum directamente, tiene q estar como export default
        //const response = sum()
        
      } catch (error) {
        return next(error);
      }
    });
    this.read("/substract", ["PUBLIC"], async (req, res,next) => {  //esta cb no es necesario q sea asincrona
      try {
        console.log("global process id: "+process.pid);
        const child2 = fork("./src/utils/substract.util.js");  //crea un hijo
        child2.send("start");  //activo el proceso hijo, le tengo q enviar el mensaje start
        child2.on("message", (result) => res.success200());  //para recibir un mensaje del hijo.
            //espera la respuesta del hijo, y recien ejecuta el callback
        //const child1 = fork("./src/utils/sum.util.js");
        //const child2 = fork("./src/utils/subtract.util.js");
        //child1.send("start");
        //child2.send("start");
        //const results = {}
        //child1.on("message", (result) => results.sum = result);
        //child2.on("message", (result) => results.substract = result);
        //return res.success200(results)

        //cuando se llama sum directamente, tiene q estar como export default
        //const response = sum()
        
      } catch (error) {
        return next(error);
      }
    });

  }
}

// 
// //definir los enrutadores de los recursos
// apiRouter.use("/users", usersRouter);
// apiRouter.use("/events", passport.authenticate("jwt",{session:false,failureRedirect:"/api/sessions/badauth"}), eventsRouter);
// apiRouter.use("/orders", passport.authenticate("jwt",{session:false,failureRedirect:"/api/sessions/badauth"}), ordersRouter);
// //el middleware trabajando a nivel del enrutador protege todas las rutas
// //(pide autenticacion a todas las rutas de ordenes)
// //el agregarle el , passport.authenticate("jwt",{session:false}), hace q solo pueda usar ese enpoint alguien q este loguead
// 
// 
// //apiRouter.use("/cookies", cookiesRouter);
// //apiRouter.use("/auth", sessionsRouter);   //es mas usado el nombre auth en lugar de sessions, pero nosotros usaremos sessions
// apiRouter.use("/sessions", sessionsRouter);
// 
// export default apiRouter;
// //export el enrutador de la API para poder implementarlo en el enrutador del servidor
