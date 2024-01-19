import express from "express"
import { createServer } from "http";  // la funcion para crear el server
import { Server } from "socket.io";   // la clase para crear un socket server
import products from "./src/data/fs/productFs.manager.js";



import router from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan"; 
import { engine } from "express-handlebars";


const server = express()
const PORT = 8080
const ready = ()=>console.log("server ready on port "+PORT);
//server.listen(PORT,ready)

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready); //este servidor nativo de node va a tener todas las configuraciones de express
//este servidor nativo si es compatible con socket
socketServer.on("connection", (socket) => {
  console.log("se conecto alguien nuevo")
  socket.emit("welcome", "welcome to my cinema")
  socket.emit("products", products.read() );
  
  
  
  socket.on("new product",(msg)=>console.log(msg))


  
});








//views
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");


//middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname+"/public"))
server.use(morgan("dev"))






server.use("/",router)            //q use todas las rutas q voy a definir en ese enrutador principal
server.use(errorHandler)
server.use(pathHandler)
