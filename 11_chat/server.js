import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";


import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import events from "./src/data/fs/events.fs.js";


const messages = [];
//server
const server = express();
const PORT = 8080;
const ready = console.log("server ready on port " + PORT);
const httpServer = createServer(server)
const socketServer = new Server(httpServer)
httpServer.listen(PORT, ready);         //levanto el server de node con el metodo listen
socketServer.on("connection",socket=>{        //levanto el socketServer. on() recibe 2 parametros. 1 es el msg q envia el cliente, q es connection
  console.log("connected id: "+socket.id);    //el otro es la variable socket. y en esa variable hay muchos datos en los q se encuentra el id
                                            //q es lo q yo voy a imprimir
  socket.on("user",()=>{
    socket.emit("all",messages)

  })                                          
  socket.emit("messages",messages)
  socket.on("new chat",data =>{
    messages.push(data)
    console.log(messages)
    socketServer.emit("all",messages)               // con este metodo envio un mensaje a todos los usuarios

  })
})



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
