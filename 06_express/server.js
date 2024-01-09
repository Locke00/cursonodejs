import express from "express";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

//middlewares (son funciones)
server.use(express.urlencoded({ extended: true }));
//express.urlencoded es un middleware q obliga al server a usar la funcion encargada de recibir URLs complejas
//me habilita el manejo de queries(consultas) y params(parametros)

//una URL compleja es una q tiene consultas o parametros

server.listen(PORT, ready); // el puerto en el q va a funcionar y el callback, como parametros

const ruta = "/";
//callback de un endpoint (SIEMPRE depende de req y res)

const funcionQueVaAleer = (requerimientos, respuesta) => {
  //requerimientos: objeto con todas las necesidades de la funcion
  //respuesta: objeto a enviar al cliente
  return respuesta.status(200).send("<h1>MY FIRST EXPRESSsss SERVER</h1>");
};
server.get(ruta, funcionQueVaAleer);
//defino una ruta de tipo GET
//con la palabrita "/"
//para q ejecute la funcion definida
//q en ese caso SIMPLEMENTE envia ese string a la vista

const ruta2 = "/events";
const funcion2 = (req, res) => {
  const all = ["aca", "deberian", "estar", "todos", "los", "eventos"];
  return res.status(200).send(all);
};
server.get(ruta2, funcion2);

const ruta3 = "/api/users";
//al elegir los nombres de los endpoints, tomar en cuenta lo siguiente:
//- endpoints representativos del recurso q van a operar
//- endpoints en ingles, en plural y en lo posible en minusculo
const funcion3 = (req, res) => {
  const all = ["array", "de", "usuarios", "del", "archivo"];
  return res.status(200).json(all);
  //send(): cuando quiera enviar un mensaje o vista
  //json(): cuando quiera mandar un array o un objeto
};

server.get(ruta3, funcion3);
//cuando el cliente me llama con la ruta3, se ejecuta la funcion3

const rutaConParams1 = "/api/products/:pid";
//la ruta tiene el parametro pid
//debido a los :

const cbParams1 = (req, res) => {
  //const params = res.params      // es una forma, pero es mejor desestructurando
  const { pid } = req.params; // de esta forma capturo los parametros  // aqui uso destructuring

  //console.log(params);

  //return res.status(200).send("el id del producto a filtrar es: "+params.pid)    esta opcion uso si no desestructure
  return res.status(200).send("el id del producto a filtrar es: " + pid);
};
server.get(rutaConParams1, cbParams1); // lo puedo llamar asi: http://localhost:8080/api/products/1234
// y me devolvera: el id del producto a filtrar es: 1234

const rutaConParams2 = "/api/products/:title/:category/:price/:stock"; // no hay limites en la cantidad de parametros q le voy a pasar al endpoint
const cbParams2 = (req, res) => {               // hay q respetar el orden de los parametros
  const { title, category, price, stock } = req.params;
  return res.status(200).json({
    title,
    category,
  });
};
server.get(rutaConParams2, cbParams2);   // lo llamo asi: http://localhost:8080/api/products/zapatillas/calzados/1000/100
  // me devuelve:    {
  //"title": "zapatillas",
  //"category": "calzados" }
