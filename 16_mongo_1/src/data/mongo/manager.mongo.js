//importar los modelos para luego ngenerar las instancias de
//las diferentes managers
import User from "./models/user.model.js";
import Event from "./models/event.model.js";
import Order from "./models/order.model.js";
import notFoundOne from "../../utils/notFountOne.utils.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  //los metodos estos todos son asincronos
  async create(data) {
    try {
      const one = await this.model.create(data); //asi obtengo el objeto
      //return one._id; //devuelvo el id
      return one
    } catch (error) {
      throw error;
    }
  }

  // a este read le voy a poner un filtro y un ordenamiento, x eso le paso parametro)
  async read({ filter, order}) {
    try {
      //filter cno las consultas para el fitro
      //sort onel objeto para el ordenamiento

      //if (!filter) { filter = {} }    // para configurar el filtro x defecto
      //if (!order) { order = { name: 1 } }   // para configurar el orden x defecto

      //const all = await this.model.find(filter,"-createdAt -updateAt -__v")    //si quisiera q quitar unos cambpos de la respuesta padre

      const all = await this.model.find(filter)   // los populate los saco xq me va a dar error en los modelos q no son order. la forma de incoporar las referencias lo voy a hacer usando el middleware PRE, en order.model.js
        //.populate("user_id","-password -createdAt -updatedAt -__v")  // '-', para q esos campos no se agreguen
        //.populate("event_id","name planes price")   // para q esos campos si se agregen
        .sort(order);
      if (all.lenght === 0) {
        const error = new Error("There aren't documents");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      /*if (!one) {
        const error = new Error("There isn't any documents");
        error.statusCode = 404;
        throw error;
      }*/
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true };
      //este objeto de configuracion OPCIONAL devuelve el objeto LUEGO de la modificaicion
      const one = await this.model.findByIdAndUpdate(id, data, opt); // si no le paso el parametro opt, la funcion me devolveria el objeto antes de la modificacion
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async stats({filter}) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");
      console.log(stats);
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionStatsMillis
      }
      return stats
    } catch (error) {
      throw error
    }
  } 
}

const users = new MongoManager(User);
const events = new MongoManager(Event);
const orders = new MongoManager(Order);

export { users, events, orders };

//alternativamente se puede hacer un export default del manager, 
//pero lo mejor, es exportar las instanacias:
//export default MongoManager;
