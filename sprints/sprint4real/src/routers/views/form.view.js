import { Router } from "express";
// import { Server } from "socket.io"
import { io } from "socket.io-client";

const socket = io("ws://localhost:8080");

const formRouter = Router();

formRouter.get("/", (req, res, next) => {
  try {

    document.querySelector("#newProduct").addEventListener("click", (event) => {
      event.preventDefault();
      const title = document.querySelector("#title").value;
      const poster = document.querySelector("#poster").value;
      const price = document.querySelector("#price").value;
      const capacity = document.querySelector("#capacity").value;
      const place = document.querySelector("#place").value;
      const date = document.querySelector("#date").value;
    
      const data = {};
      title && (data.title = title);
      if (poster) {
        data.poster = poster;
      }
      price && (data.price = price);
      if (capacity) {
        data.capacity = capacity;
      }
      place && (data.place = place);
      date && (data.date = date);
      console.log(data);
      
      socket.emit("new product", data);
      console.log("x aqui paso");
  
    });






    return res.render("form", { title: "Formulario" });
  } catch (error) {
    console.log("x aqui paso -catch");
    next(error);
  }
});

export default formRouter;
