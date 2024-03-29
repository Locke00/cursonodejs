
import CustomRouter from "../CustomRouter.js";

//import users from "../../data/fs/userFs.manager.js"
//import { users } from "../../data/mongo/manager.mongo.js";
//const usersRouter = Router()

import {
  create,
  read,
  readOne,
  stats,
  update,
  destroy,
} from "../../controllers/users.controller.js";



class UsersRouter extends CustomRouter {
  init() {
    //aca defino los endpoint (post, get, put, delete)
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/stats",  ["PUBLIC"], stats);
    this.read("/:uid",  ["PUBLIC"], readOne);
    this.update("/:uid",  ["PREM"], update);
    this.destroy("/:uid",  ["ADMIN"], destroy);
  }
}


const usersRouter = new UsersRouter();
export default usersRouter.getRouter();


    //this.get("/isuser", async (req, res, next) => {
    //  try {
    //    let filter = {}; //este tiene q ser let
    //    if (req.query.email && req.query.password) {
    //      console.log("ingresado mail y pass");
    //      filter = { email: req.query.email, password: req.query.password };
    //      const all = await users.read({ filter });
    //      //console.log(all);
    //      console.log(all.docs.length);
    //      if (all.docs.length >= 1) {
    //        req.session.email = req.query.email;
    //        return json({
    //          statusCode: 200,
    //          message: "Logged in",
    //          session: req.session,
    //        });
    //      }
    //    } else {
    //      console.log("no ingresado mail y pass");
    //    }
    //    const error = new Error("Bad auth");
    //    error.statusCode = 401;
    //    throw error;
    //  } catch (error) {
    //    return next(error);
    //  }
    //});

    //usersRouter.get("/isuser",async (req,res,next)=>{
    //      try {
    //        const { email, password } = req.query;
    //        
    //        const one = await users.isuser(email, password)
    //        console.log(one);
    //        //console.log(typeof(one));
    //        //console.log(one[0]._id);
    //        //const one = await users.findOne({ email: "joseluis@gmail.com" }, {email:1, password: 1})
    //        //console.log(one);
    //        
    //        if (!one) {
    //          const error = new Error("There isn't any documents");
    //          error.statusCode = 404;
    //          throw error;
    //        }
    //        return res.json({
    //          statusCode: 200,
    //          response: one,
    //        });
    //      } catch (error) {
    //        return next(error);
    //      }
    //    })



//      this.read("/", ["PUBLIC"], async (req, res, next) => {
//      try {
//        console.log("paso x aqui");
//        const filter = {};
//        if (req.query.name) {
//          filter.name = new RegExp(req.query.name.trim(), "i");
//        }
//        // vamos a hacer una ordenacion y paginacion x defecto:
//        const orderAndPaginate = {
//          limit: req.query.limit || 10, //q cada pagina tenga 20 documentos
//          page: req.query.page || 1, //q arranque x defecto en la pagina 1
//          //sort: { name: 1 }    //q lo ordene x nombre   (si quisiera ordenar x email: sort: { name: 1 })
//        };
//
//        //if (req.query.name==="desc") {        //estos considionales son necesarios para cuando hay q poner en particuplar 
//        //orderAndPaginate.sort.name = -1
//        //}
//        const all = await users.read({ filter, orderAndPaginate }); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort
//        res.success200(all);
//      } catch (error) {
//        return next(error);
//      }
//    });
