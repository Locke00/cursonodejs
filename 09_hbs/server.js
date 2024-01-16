import express, { Router } from "express";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";

import router from "./src/routers/index.router.js ";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

server.listen(PORT, ready);

//templates:
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");  // ruta donde se van a colocar las vistas

//middlewares:
server.use(express.json()); //para q express pueda trabajar correctamente con los archivos json
server.use(express.urlencoded({ extended: true })); // permite leer correctamente los queries y los params
server.use(express.static(__dirname + "/public")); // para q pueda usar la carpeta de acceso /public
server.use(morgan("dev")); //para q cada peticion la registre con el modulo de morgan, en modo desarrollo

//definir:
//enrutadores:
server.use("/", router);
//cacheador de errores
server.use(errorHandler);
//cacheador de rutas no encontradas:
server.use(pathHandler);
