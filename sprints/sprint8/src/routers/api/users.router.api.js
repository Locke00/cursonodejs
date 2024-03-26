
import CustomRouter from "../CustomRouter.js";

//import users from "../../data/fs/userFs.manager.js"
import { users } from "../../data/mongo/manager.mongo.js";

//const usersRouter = Router()
export default class UsersRouter extends CustomRouter {
  init() {
    //aca defino los endpoint (post, get, put, delete)
    this.create("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const data = req.body;
        const response = await users.create(data);
        return res.success201(response)
      } catch (error) {
        return next(error);
      }
    });
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        console.log("paso x aqui");
        const filter = {};
        if (req.query.name) {
          filter.name = new RegExp(req.query.name.trim(), "i");
        }
        // vamos a hacer una ordenacion y paginacion x defecto:
        const orderAndPaginate = {
          limit: req.query.limit || 10, //q cada pagina tenga 20 documentos
          page: req.query.page || 1, //q arranque x defecto en la pagina 1
          //sort: { name: 1 }    //q lo ordene x nombre   (si quisiera ordenar x email: sort: { name: 1 })
        };

        /*if (req.query.name==="desc") {        //estos considionales son necesarios para cuando hay q poner en particuplar 
      orderAndPaginate.sort.name = -1
    }*/
        const all = await users.read({ filter, orderAndPaginate }); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort
        res.success200(all);
      } catch (error) {
        return next(error);
      }
    });

    /*this.get("/isuser", async (req, res, next) => {
      try {
        let filter = {}; //este tiene q ser let
        if (req.query.email && req.query.password) {
          console.log("ingresado mail y pass");
          filter = { email: req.query.email, password: req.query.password };
          const all = await users.read({ filter });
          //console.log(all);
          console.log(all.docs.length);
          if (all.docs.length >= 1) {
            req.session.email = req.query.email;
            return json({
              statusCode: 200,
              message: "Logged in",
              session: req.session,
            });
          }
        } else {
          console.log("no ingresado mail y pass");
        }
        const error = new Error("Bad auth");
        error.statusCode = 401;
        throw error;
      } catch (error) {
        return next(error);
      }
    });*/

    /*usersRouter.get("/isuser",async (req,res,next)=>{
          try {
            const { email, password } = req.query;
            
            const one = await users.isuser(email, password)
            console.log(one);
            //console.log(typeof(one));
            //console.log(one[0]._id);
            //const one = await users.findOne({ email: "joseluis@gmail.com" }, {email:1, password: 1})
            //console.log(one);
            
            if (!one) {
              const error = new Error("There isn't any documents");
              error.statusCode = 404;
              throw error;
            }
            return res.json({
              statusCode: 200,
              response: one,
            });
          } catch (error) {
            return next(error);
          }
        })


        */

    this.read("/stats",  ["PUBLIC"], async (req, res, next) => {
      try {
        const all = await users.stats({});
        return res.success200(all)
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:uid",  ["PUBLIC"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await users.readOne(uid);
        //console.log(one);
        return res.success200(one)
      } catch (error) {
        return next(error);
      }
    });
    this.update("/:uid",  ["PREM"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const response = await users.update(uid, data);
        return res.success200(response)
      } catch (error) {
        return next(error); //indica q lo dejo pasar al middleware de errores
      }
    });
    this.destroy("/:uid",  ["ADMIN"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const response = await users.destroy(uid);
        return res.success200(response)
      } catch (error) {
        return next(error);
      }
    });
  }
}
