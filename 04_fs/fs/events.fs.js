const fs = require("fs");
const crypto = require("crypto");

class EventsManager {
  static #perGain = 0.3;
  static #totalGain = 0;
  //events = []

  //init es bloqueante(o sea, sincrona)
  //si esta funcion no se ejecuta, no puedo hacer nada del resto
  init() {
    try {
      const exists = fs.existsSync(this.path);
      //console.log(exists); // devuelve true solo si existe
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        // acá, si es q existe, una alternativa es no hace nada
        //pero lo mejor es hacer algo

        this.events = JSON.parse(fs.readFileSync(this.path, "utf-8")); // guanda en all los eventos
        //console.log(this.events);
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    this.events = [];
    this.init();
  }

  async createEvent(data) {
    try {
      if (!data.name || !data.place) {
        throw new Error("name & place are required");
      }

      const event = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        place: data.place,
        price: data.price || 10,
        capacity: data.capacity || 50,
        date: data.date || new Date(),
      };
      //console.log(event);

      this.events.push(event);
      const jsonData = JSON.stringify(this.events, null, 2);

      //console.log(jsonData);

      await fs.promises.writeFile(this.path, jsonData); //all poner await, debo poner async a la funcion donde esta esta instruccion
      console.log(event.id);
      return event.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readEvents(){
    try {
      if(this.events.length===0){
        throw new Error("The are no events!")
      } else {
        console.log(this.events);
        return this.events
      }

    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readEventById(id){
    try{
      const one = this.events.find(each=> each.id===id)
      if(!one) {
        throw new Error("There isn't not events")
      } else {
        console.log(one);
      }
    } catch (error) {

      console.log(error.message);
      return error.message;
    }



  }



}

const events = new EventsManager("./04_fs/fs/files/events.json");
events.readEvents();
events.createEvent({ name: "hp1", place: "showcase" });
events.createEvent({ name: "hp2" });
events.readEvents();
events.readEvents(1);
events.readEventById("b9c6cec77045cfdfb7e315a7")