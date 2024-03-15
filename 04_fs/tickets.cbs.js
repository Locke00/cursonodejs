// para manejo de archivos en forma asincronica, podemos hacerlo de dos formas:
// - con promesas
// - con callbacks


//la creacion y la sobreescritura rara vez es asincronica
const fs = require("fs"); // alternnativa vieja
const ruta = "./data/events.cbs.json"
const contenido = [{ title: "hp1" }, { title: "hp2"},{ place: "hp3" }]
const contenidoString = JSON.stringify(contenido,null,2)


//ESCRITURA SINCRONICA
fs.writeFile(ruta, contenidoString, (error) => {
  if(error) {
    console.log(error);
    //recomiendo retornan error.message
    return error
  }
})


// LECTURA ASINCRONICA
//si la lectura es mas rapido q la creacion va a dar error
let configuracion = 'utf-8'

fs.readFile(ruta, configuracion, (error, exito)=>{
  if(error) {
    console.log(error);
    return error
  } else {
    console.log(exito);
    return exito
  }
})

//para elimnar un archivo en forma asincronica
fs.unlink(ruta, (error)=>{
  if(error) {
    console.log(error);
    return error
  }
})


