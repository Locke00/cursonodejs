import { Router } from "express";
import apiRouter from "./api/index.router.api.js"
import viewsRouter from "./views/index.view.js";

const router = Router()

//enrutador de la API con "/api"
router.use("/api", apiRouter);
//enrutador de vistas con "/"
router.use("/", viewsRouter);


export default router