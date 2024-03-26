import CustomRouter from "../CustomRouter.js";
import { clothes } from "../../data/mongo/manager.mongo.js";

class ClothesRouter extends CustomRouter {
  init() {
    //esto hay q enviarle: create(path, policies, ...cbs)
    this.create("/", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const data = req.body; //guardo en data lo q me envian dsd el body
        const response = await clothes.create(data);
        return res.success201(response);
      } catch (error) {
        return next(error); //para q el error handler se encargue de manejarlo
      }
    });
    this.read("/",["PUBLIC"], async (req,res,next)=>{
      try {
        const response = await clothes.read({})
        res.success200(response)
      } catch (error) {
        next(error)
      }
    })


    //this.read()
    //this.read()
    //this.update()
    //this.destroy()
  }
}

export default ClothesRouter;
