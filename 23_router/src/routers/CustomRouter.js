import { Router } from "express";



export default class CustomRouter {
  constructor(){
    this.router = Router()  //esto no es una clase. cuando lo ejecuto se crea un objeto Router
    this.init()   //ejecuto la funcion inicializadora de la instancia
  }
  getRouter(){ //funcion q va a ser la encargada de retornar el enrutador. funcion q me devuelva todos los endpoints
    return this.router
  } 
  init(){} //funcion inicializadora de la instancia. esta se usa x ejemplo para extender la clase
  applyCbs(cbs) { // va a depender de todos los middlewaress y callbacks q necesite en endpoint. 
    //cbs es un array de callbacks.  (x ej todos los middlewares q necesita el endpoint /api/sessions/signout)

    return cbs.map(each => async(...params)=>{ //retorna un array de callbacks transformado. (params hace referencia a req, res y next)
      try {  //esperar q cada uno de los middleware(callbacks) se aplique en este entorno con los valores q tengo 
        await each.apply(this, params)
      } catch (error) {
        /*return*/ params[1].json({statusCode:500, message:error.message})  //(params[1] hace referencia a res)
        //req es params[0], res es params[1], next es params[2]
      }
    })  
  }

  //primer metodo del crud q vamos a crear. si queremos, lo podemos llamar post. el lo va a llamar create
  create(path, ...cbs) {  //operador rest (xq yo puedo tener varios middlewares, y el callback)
    //path: la ruta del enpoint, puede ser: /, /api, /events, /:pid
    //el segundo parametro son los middlewares
    this.router.post(path, this.applyCbs(cbs))  //como quiero hacer q este sea un endpoint POST, uso la funcion post(). cbs viene de ...cbs
  }

  read(path, ...cbs){
    this.router.get(path, this.applyCbs(cbs))
  }
  update(path, ...cbs){
    this.router.put(path, this.applyCbs(cbs))
  }
  destroy(path, ...cbs){
    this.router.delete(path,this.applyCbs(cbs))
  }
  use(path, ...cbs){
    this.router.use(path, this.applyCbs(cbs))
  }

  //hay una forma de agregar un tercer parametro, q va a indicar de cual de las funciones se trata, con lo cual reduciria
  //la cantidad de funciones q voy a usar



}