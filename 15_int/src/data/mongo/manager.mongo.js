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
      return one._id; //devuelvo el id
    } catch (error) {
      throw error;
    }
  }

  // a este read le voy a poner un filtro y un ordenamiento, x eso le paso parametro)
  async read(obj) {
    try {
      //ahora obj es un objeto con los dos propiedades
      //filter cno las consultas para el fitro
      //sort onel objeto para el ordenamiento
      let { filter, order } = obj; //desestrecturo el objeto de parametro

      //if (!filter) { filter = {} }    // para configurar el filtro x defecto
      //if (!order) { order = { name: 1 } }   // para configurar el orden x defecto

      const all = await this.model
        .find(filter)
        .populate("user_id")
        .populate("event_id")
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
}

const users = new MongoManager(User);
const events = new MongoManager(Event);
const orders = new MongoManager(Order);

export { users, events, orders };
