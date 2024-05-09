import { comments } from "../data/mongo/manager.mongo.js";

class CommentsService {
  constructor() {
    this.model = comments;
  }
  
  //se puede hacer de esta forma simplificada, ya q la capa de servicio es bastante simple
  //ademas, no necesito poner en bloques try-catch, ya q la capa de modelos,
  //y el controlador, ya tienen capas de verificacion de errores
  //create = async data => await this.model.create(data); //forma alternativa simplificada
  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response; //esta respuesta es enviada al controlador
    } catch (error) {
      throw error;
    }
  };
  read = async ({ filter, options }) => {
    try {
      const response = await this.model.read({ filter, options });
      return response;
    } catch (error) {
      throw error;
    }
  };
  readOne = async (id) => {
    try {
      const response = await this.model.readOne(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      const response = await this.model.update(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (id) => {
    try {
      const response = await this.model.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
  //forma simplificada:
  //create = async (data) => await this.model.create(data);
  //read = async ({ filter, options }) => await this.model.read({ filter, options });
  //readOne = async (id) => await this.model.readOne(id);
  //update = async (id,data) => await this.model.update(id, data);
  //destroy = async (id) => await this.model.destroy(id);


  
}

const service = new CommentsService();
export default service;
