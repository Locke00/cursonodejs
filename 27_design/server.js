//import "dotenv/config.js"; // importar la libreria de dotenv. ya no es necesario xq lo hago dsd env
import env from "./src/utils/env.util.js"

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import expressSession from "express-session"
import socketUtils from "./src/utils/socket.utils.js";
//import dbConnection from "./src/utils/db.js";
import sessionFileStore from "session-file-store";  //es una funcion
import MongoStore from "connect-mongo"   // es una clase
import args from "./src/utils/args.util.js";
import cors from "cors";


//import router from "./src/routers/index.router.js";  //este no va, ahora voy a usar customRouter
import IndexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import dbConnection from "./src/utils/dbConnection.utils.js";

 



//server
const server = express();
const PORT = process.env.PORT || 8080;   // si no existe la variable de entorno PORT, usará el puerto 8080
//const ready = console.log("server ready on port " + PORT);
const ready = () => {
  console.log("server ready on port " + PORT);
  dbConnection();
};

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready); //levanto el server de node con el metodo listen

//una forma mas limpia de configurar el socket server es usando utils
socketServer.on("connection", socketUtils);

//views
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");


//const FileStore = sessionFileStore(expressSession)

//middlewares
server.use(cookieParser(process.env.SECRET_KEY));

//MEMORY STORE
/* server.use(
  expressSession({
    secret: process.env.SECRET_KEY,             // esta key puede ser la misma q la de las cookies, o puede ser distinta
    resave: true,    //permite q la session del usuario tdvia este activa aunq el usuario haya cerrado la pestaña
    saveUninitialized: true,        // permite tener una sesion vacia iniciada
    cookie: { maxAge: 60000 },
  })
); */
//FILE STORE
/* server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
      path: "./src/data/fs/files/sessions",
      ttl: 10000,
      retries: 2,
    }),
  })
); */
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





/*
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,             // esta key puede ser la misma q la de las cookies, o puede ser distinta
    resave: true,    //permite q la session del usuario tdvia este activa aunq el usuario haya cerrado la pestaña
    saveUninitialized: true,        // permite tener una sesion vacia iniciada
    //cookie: { maxAge: 60000 } ,  // comento esto, ya  lo haré por file store
    store: new FileStore({
      path: './src/data/fs/files/sessions',
      ttl: 7 * 24 * 60 * 60,  // este es en segundos. en este ejemplo serian 7 dias
      retries: 2
    })
    //store: new MongoStore({
    //  ttl: 7 * 24 * 60 * 60,
    //  mongoUrl: process.env.DB_LINK
    //})
  })
)
*/

server.use(  // para q me detecte la cookie
  cors({
    origin: true,
    credentials: true,
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

//endpoints
const router = new IndexRouter() //router es una instancia en enrutador, no es un enrutador con todos los endpoints
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };

console.log(args);