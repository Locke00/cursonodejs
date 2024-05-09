import { Router } from "express";
//import products from "../../data/fs/productFs.manager.js"
//import { pdo } from "../../data/mongo/manager.mongo.js";
import { products } from "../../data/mongo/manager.mongo.js";

//import isAdmin from "../../middlewares/isAdmin.mid.js"
//import isAuth from "../../middlewares/isAuth.mid.js";


import CustomRouter from "../CustomRouter.js";
//import passport from "passport";
//import passCallBackMid from "../../middlewares/passCallBack.mid.js";

export default class ProductsRouter extends CustomRouter {
  init(){
    //aca defino los endpoint (post, get, put, delete)
    this.create("/", ["ADMIN","PREM"], async (req,res,next)=>{
      try {
        const data = req.body;
        //console.log(data);
        const response = await products.create(data);
        if (response === "title is required") {
          return res.error400(response)
        } else {
          return res.success201(response)
        }
      } catch (error) {
        return next(error)  //indica q lo dejo pasar al middleware de errores
      }
    })
    this.read("/",["PUBLIC"], async (req,res,next)=>{
      try {
        const filter = {}
    /*    if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(),'i') 
        }*/
        // vamos a hacer una ordenacion y paginacion x defecto:
        const orderAndPaginate = {
          limit: req.query.limit || 10,       //q cada pagina tenga 20 documentos
          page: req.query.page || 1,         //q arranque x defecto en la pagina 1
          //sort: { title: 1 }    //q lo ordene x nombre   (si quisiera ordenar x email: sort: { name: 1 })
        }
        //console.log(req.query.limit);
      
        if (req.query.title==="desc") {        //estos considionales son necesarios para cuando hay q poner en particuplar 
          orderAndPaginate.sort.title = -1
        }
      
        const all = await products.read({filter, orderAndPaginate}); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort
        return res.success200(all)
      } catch (error) {
        return next(error);
      }
    
    })
    this.read("/:pid",["PUBLIC"],async (req,res,next)=>{
      try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        //console.log(one);
        return res.success200(one)
      } catch (error) {
        return next(error)  //indica q lo dejo pasar al middleware de errores
      }
    })
    this.update("/:pid",["PREM","ADMIN"], async (req,res)=>{
      try {
        const { pid } = req.params
        const data = req.body;
        const response = await products.update(pid,data);
        return res.success200(response)
      } catch (error) {
        return next(error)  //indica q lo dejo pasar al middleware de errores
      }
    })



    this.destroy("/:pid",["PREM","ADMIN"],async(req,res)=>{
      try {
        const { pid } = req.params;
        const response = await products.destroy(pid);
        return res.success200(response)
      } catch (error) {
        return next(error);
      }
    })

  }
}




