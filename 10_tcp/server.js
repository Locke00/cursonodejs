import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import morgan from "morgan";
import { engine } from "express-handlebars";
import events from "./src/data/fs/events.fs.js";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";

//server
const server = express();
const PORT = 8080;
const ready = console.log("server ready on port " + PORT);
//server.listen(PORT, ready);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready); //este servidor nativo de node va a tener todas las configuraciones de express
//este servidor nativo si es compatible con socket
socketServer.on("connection", (socket) => {
  //el 1er parametro "connection habilita la comunidacion bidireccionl
  //console.log(socket );
  //socket es TODA la data q envia el cliente luego del handshake
  console.log(socket.id);
  socket.emit("welcome", "welcome to my cynema");
  socket.emit("movies", events.readEvents())

  socket.on("new movie", async (data) => {
    try {
      console.log(data);
      //en lugar de mostrarlo en la consola
      //deberia agregarlo al json con todas las peliculas
      await events.createEvent(data);
      //socket.emit("new success", "well done!");
      socket.emit("movies", events.readEvents())
    } catch (error) {
      console.log(error);
    }
  });
});

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
