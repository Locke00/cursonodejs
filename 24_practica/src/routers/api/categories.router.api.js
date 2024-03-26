
import CustomRouter from "../CustomRouter.js";
import { categories } from "../../data/mongo/manager.mongo.js";

export default class CategoriesRouter extends CustomRouter {
  init(){
    this.create("/",["ADMIN","PREM"], async(req,res,next)=>{
      try {
        const newCategory = categories.create(req.body)
        return res.success201(newCategory)
        
      } catch (error) {
        next(error)
      }
    })

    this.read("/",["PUBLIC"], async (req,res,next)=>{
      try {
        const { id } = req.params //el id lo obtengo de los parametros
                    //req.params viene de localhost:8080/api/categories/6601dca95d8f5a1a6c036949 , es lo final
        const category = await categories.read({})

        res.success200(category)
      } catch (error) {
        next(error)
      }
    })


    this.read("/:id",["PUBLIC"], async (req,res,next)=>{
      try {
        const { id } = req.params //el id lo obtengo de los parametros
                    //req.params viene de localhost:8080/api/categories/6601dca95d8f5a1a6c036949 , es lo final
        const category = await categories.readOne(id)

        res.success200(category)
      } catch (error) {
        next(error)
      }
    })

    this.update("/:id",["ADMIN","PREM"], async (req,res,next)=>{
      try {
        const { id } = req.params //el id lo obtengo de los parametros
        const modifiedCategory = await categories.update(id,req.body)

        res.success200(modifiedCategory)
      } catch (error) {
        next(error)
      }
    })

    this.destroy("/:id",["ADMIN","PREM"], async (req,res,next)=>{
      try {
        const { id } = req.params //el id lo obtengo de los parametros
        const deletedCategory = await categories.destroy(id)

        res.success200(deletedCategory)
      } catch (error) {
        next(error)
      }
    })



  }
}