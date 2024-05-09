

//import "dotenv/config.js"; // importar la libreria de dotenv. ya no es necesario xq lo hago dsd env
import env from "./src/utils/env.util.js"
import express from "express"
import { createServer } from "http";  // la funcion para crear el server
import { Server } from "socket.io";   // la clase para crear un socket server
//import products from "./src/data/fs/productFs.manager.js";



//import router from "./src/routers/index.router.js"
import IndexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan"; 
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import socketUtils from "./src/utils/socket.utils.js";
import expressSession from "express-session"
//import productsRouter from "./src/routers/api/products.router.api.js";
import MongoStore from "connect-mongo"
import args from "./src/utils/args.util.js"
import cors from "cors";

import { log } from "console";
import dbConnection from "./src/utils/dbConnection.util.js";
import userDataMiddleware from "./src/middlewares/userData.mid.js";



const server = express()
const PORT = process.env.PORT || 8080;
const ready = () => {
  console.log("server ready on port " + PORT);
  dbConnection();
};
//server.listen(PORT,ready)

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready); //este servidor nativo de node va a tener todas las configuraciones de express

//este servidor nativo si es compatible con socket
socketServer.on("connection", socketUtils);





//views
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");


//middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname+"/public"))
server.use(morgan("dev"))
server.use(cookieParser(process.env.SECRET_KEY));
server.use(userDataMiddleware)
server.use(
  cors({
        origin: true,
        credentials: true
   })
);
/*server.use(
  expressSession({
    secret: process.env.SECRET_KEY,             // esta key puede ser la misma q la de las cookies, o puede ser distinta
    resave: true,    //permite q la session del usuario tdvia este activa aunq el usuario haya cerrado la pestaña
    saveUninitialized: true,        // permite tener una sesion vacia iniciada
    cookie: { maxAge: 6000 }
  })
)*/


//MONGO STORE
server.use(expressSession({
  secret: process.env.SECRET_KEY,             // esta key puede ser la misma q la de las cookies, o puede ser distinta
  resave: true,    //permite q la session del usuario tdvia este activa aunq el usuario haya cerrado la pestaña
  saveUninitialized: true,        // permite tener una sesion vacia iniciada
  store: new MongoStore({
    ttl: 100,          // chequear la unidad del ttl
    mongoUrl: process.env.DB_LINK
  })
})
)




//server.use("/",router)            //q use todas las rutas q voy a definir en ese enrutador principal
const router = new IndexRouter() //router es una instancia en enrutador, no es un enrutador con todos los endpoints
server.use("/", router.getRouter());


server.use(errorHandler)
server.use(pathHandler)


export { socketServer }

