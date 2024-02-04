import "dotenv/config.js"; // importar la libreria de dotenv

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import socketUtils from "./src/utils/socket.utils.js";
import dbConnection from "./src/utils/db.js";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import events from "./src/data/fs/events.fs.js";

//server
const server = express();
const PORT = 8080; 
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

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

//endpoints
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };
