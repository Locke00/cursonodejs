/*import express from "express"

const server = express()  //crea el server

const PORT = 8080
const ready = console.log("server ready on port "+PORT);//para q cuando el server este funcionando correctamente, me muestre ese mensaje en la consola

server.listen(PORT,ready)  //levante el server
*/

import express from "express";
import events from "./data/fs/events.fs.js";
import users from "./data/fs/users.fs.js";

const server = express();

const PORT = 9000;
const ready = console.log("server ready on port " + PORT);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

//endpoints
//CREATE EVENTS
server.post("/api/events", async (req, res) => {  //async xq la funcion en algun punto va a quedar a la espera q se resuelva algo
  try {
    const data = req.body;
    const response = await events.createEvent(data);
    if (response === "Name & Place are required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response, //cuando el nombre de la propiedad es igual al nombre de la variable
                  //directamente pongo el nombre de la variable(a esto se le llama estructuracion)
        //response: response es lo mismo q lo de arriba
        //el codigo 200 envia una respuesta,
        //el codigo 201 no envia ninguna respuesta
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/events", async (req, res) => {
  try {
    const all = await events.readEvents();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/events/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const one = await events.readEventById(eid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.put("/api/events/:eid/:quantity", async (req, res) => {
  try {
    const { eid, quantity } = req.params;
    const response = await events.soldticket(quantity, eid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "capacity available: " + response,
      });
    } else if (response === "There isn't any event") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.delete("/api/events/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const response = await events.removeEventById(eid);
    if (response === "There isn't any event") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});