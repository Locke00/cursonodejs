//import fs from "fs"   //esta forma no la puedo usar xq necesito hacer algo antes con los modulos
const fs = require("fs"); // alternnativa vieja
//import nombreDelModulo from "ruta del módulo ../02_ec/event.manager.js"



// CREACION:

const ruta  = "./data/tickets.json"
const datos = JSON.stringify([ {title: "hp1"} ], null, 2)

fs.writeFileSync(ruta, datos)


const rutaE  = "./data/events.json"
const datosE = JSON.stringify(
  [{ title: "hp1" }, { title: "hp2", place: "showcase" }],
   null, 
   2)

fs.writeFileSync(rutaE, datosE)


//LECTURA - sincrona:
let configuracion = "utf-8"
//lectura sincronica:
const datosLeidos = fs.readFileSync(rutaE, configuracion)   // retorna un string
const datosParseados = JSON.parse(datosLeidos)          // toma el string y la pasa a objeto de js
console.log(datosParseados);



//ELIMINACION - sincrona
fs.unlinkSync(rutaE)


//CHEQUEA SI EXISTE  - sincrona:
const existeDespues = fs.existsSync(rutaE)
console.log(existeDespues);

   