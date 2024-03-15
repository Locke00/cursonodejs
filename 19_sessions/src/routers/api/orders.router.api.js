import { orders } from "../../data/mongo/manager.mongo.js"; //importo el manager de ordenes
import { Router } from "express";

const router = Router()

router.post("/", async(req, res, next) =>{
  try {
    const data = req.body    //los parametros se pueden enviar x body, params o query,. 
                             //cuando creo algo, x lo general se envia x body
    const one = await orders.create(data)
    return res.json({
      statusCode: 201,
      response: one
    })
  } catch (error) {
    return next(error)   //para q lo procese al error el middleware de errores
  }
})

router.get("/bills/:uid", async(req, res, next)=> {
  try {
    const { uid } = req.params
    const report = await orders.reportBill(uid)
    return res.json({
      statusCode: 200,
      response: report
    })
  } catch (error) {
    throw error
  }
})

router.get("/", async(req, res, next) => {
  try {
    let filter = {}    //este tiene q ser let
    if (req.query.user_id) {
      filter = { user_id: req.query.user_id }

    }
    const all = await orders.read({ filter })
    return res.json({
      statusCode: 200,
      response: all
    })
  } catch (error) {
    return next(error)
      }
})

router.get("/:uid", async(req, res, next)=>{
  try {
    const { uid } = req.params
    const filter = { user_id: uid }
    const all = await orders.read({ filter })
    return res.json({
      statusCode: 200,
      response: all
    })
  } catch (error) {
    throw error
  }

})


/*

router.get("/:oid", async(req, res, next) => {
  try {
    const { oid } = req.params
    const one = await orders.readOne(oid)
    return res.json({
      statusCode: 200,
      response: one
    })
  } catch (error) {
    return next(error)
  }

})  */




//router.put()
//router.delete()





export default router