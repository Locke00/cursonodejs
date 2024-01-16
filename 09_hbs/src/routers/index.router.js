//este es el enrutador prinicipal de la app
import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
import usersRouter from "./views/users.view.js";


const router = Router();

//enrutador de la API con "/api"
router.use("/api", apiRouter);
//enrutador de vistas con "/"
router.use("/", viewsRouter);

router.use("/users",usersRouter)


export default router;
