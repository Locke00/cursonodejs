import User from "./models/user.model.js";
import Event from "./models/event.model.js";

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
  async read() {
    try {
      const all = await this.model.find();
      if (all.lenght === 0) {
        const error = new Error("There aren't events");
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
      if (!one) {
        const error = new Error("There isn't event");
        error.statusCode = 404;
        throw error;
      }
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
      if (!one) {
        const error = new Error("There isn't event");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      if (!one) {
        const error = new Error("There isn't event");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const users = new MongoManager(User);
const events = new MongoManager(Event);

export { users, events };
