const fs = require("fs")

const ruta = "./data/events.prom.json"
const contenido = JSON.stringify([{ tittle: "hp1" }],null,2)
//const contenido = [{ tittle: "hp1" }]  //este devolveria error

fs.promises.writeFile(ruta,contenido)
  .then( resultado=>console.log(resultado) )
  .catch( error=>console.log(error) )

let configuracion = "utf-8"
fs.promises.readFile(ruta,configuracion)
  .then(resultado=>console.log(JSON.parse(resultado)))
  .catch( error=>console.log(error) )

fs.promises.unlink(ruta)
  .then( resultado=>console.log(resultado) )
  .catch( error=>console.log(error) )

