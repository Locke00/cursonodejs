import CustomRouter from "../CustomRouter.js";
//import orders from "../../data/fs/orderFs.manager.js"
import { orders } from "../../data/mongo/manager.mongo.js"; //importo el manager de ordenes


export default class OrdersRouter extends CustomRouter {
  init(){//aca defino los endpoint (post, get, put, delete)
    this.create("/",["USER","PREM"], async (req,res,next)=>{
      try {
        const data = req.body;
        const response = await orders.create(data);
        if (response === "title is required") {
          return res.error400(response)
        } else {
          return res.success201(response)
        }
      } catch (error) {
        return next(error)  //indica q lo dejo pasar al middleware de errores
      }
    })
    
    this.read("/total/:uid",["PUBLIC"], async(req, res, next)=> {
      try {
        const { uid } = req.params
        const report = await orders.report(uid)
        return res.success200(report)
      } catch (error) {
        throw error
      }
    })
    
    this.read("/:oid",["PUBLIC"], async (req,res,next)=>{
      try {
        //console.log('bbb');
        const { oid } = req.params;
        const one = await orders.readOne(oid);
        return res.success200(one)
      } catch (error) {
        return next(error)  //indica q lo dejo pasar al middleware de errores
      }
    })
    
    this.read("/:uid", async(req, res, next)=>{
      try {
        // uid = uid.trim();
        /*const filter = { user_id: uid }
        const all = await orders.read({ filter })
        return res.success200(all)*/
        let filter = {}    
        if (req.params.uid) {
          let { uid } = req.params
          uid = uid.toString().trim();
          filter.user_id = uid;
        }
    
        const all = await orders.read({ filter })
        return res.success200(all)

      } catch (error) {
        throw error
      }
    
    })
    

    this.read("/",["PUBLIC"], async (req,res,next)=>{
      try {
    //    console.log('aaaa');
        let filter = {}    //este tiene q ser let
    /*    if (req.query.user_id) {
          filter = { user_id: req.query.user_id }
        }*/
        if (req.query.user_id) {
          filter.user_id = req.query.user_id;
        }
    
        const all = await orders.read({ filter })
        //console.log(all);
        return res.success200(all)
      } catch (error) {
        return next(error)
      }
    })

    this.update("/:oid",["USER","PREM","ADMIN"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const data = req.body
        const response = await orders.update(oid, data);
        return res.success200(response)
      } catch (error) {
        return next(error);
      }
    });
    
    
    this.destroy("/:oid",["USER","PREM","ADMIN"], async(req,res)=>{
      try {
        const { oid } = req.params;
        const response = await orders.destroy(oid);
        return res.success200(response)
      } catch (error) {
        return next(error);
      }
    })
  }


}






