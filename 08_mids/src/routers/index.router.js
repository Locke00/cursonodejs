import {Router} from "express";
import apiRouter from "./api/index.router.js"


const router = Router()



router.use("/api",apiRouter)
//falta implemetar el router de vistas



export default router