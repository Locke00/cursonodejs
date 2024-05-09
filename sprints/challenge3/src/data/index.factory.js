import argsUtil from "../utils/args.util.js";
import dbConnection from "../utils/dbConnection.util.js"

const environment = argsUtil.env;
//la variable puede ser el ambiente o directamente la persistencia con la que tengo que trabajar
//va a depender de una variable de entorno o del argumento que se pase

let dao = {};

switch (environment) {
  case "test":
    //vamos a usar MEMORY
    console.log("MEMORY CONNECTED");
    const { default: productsMemory } = await import("./memory/products.manager.js")
    const { default: usersMemory } = await import("./memory/users.manager.js")
    const { default: ordersMemory } = await import("./memory/orders.manager.js")
    dao = { products: productsMemory, users: usersMemory, orders: ordersMemory }
    break;
  case "dev":
    //vamos a usar FS
    console.log("FS CONNECTED");
    const { default: productsFs } = await import("./fs/products.fs.manager.js")
    const { default: usersFs } = await import("./fs/users.fs.manager.js")
    const { default: ordersFs } = await import("./fs/orders.fs.manager.js")
    dao = { products: productsFs, users: usersFs, orders: ordersFs }
    break;
  case "prod":
    //vamos a usar MONGO
    //aca es necesario configurar la conexión de mongo
    dbConnection()
      .then(() => console.log("MONGO CONNECTED"))
    const { default: productsMongo } = await import("./mongo/products.mongo.js")
    const { default: usersMongo } = await import("./mongo/users.mongo.js")
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js")
    dao = { products: productsMongo, users: usersMongo, orders: ordersMongo }
    break;
  default:  //aca estaria bueno agregar un default
    break;
}

export default dao;
