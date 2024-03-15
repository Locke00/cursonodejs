import { Router } from "express";
//import users from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/", async (req, res, next) => {
  try {

    const filter = {}
    if (req.query.email) {
      //filter.email = req.query.email
      filter.email = new RegExp(req.query.email.trim(),'i')   //el trim es para quitar los espacios de adelante y de atrás
      //al usar la expresion regular, permito q lo q pase x parametro en la url get, como email, no lo tome estrictamente
      //sino q me devuelva los q email q tengan dentro lo q le pasé como parámetro. x ej, si paso: http://localhost:8080/api/users?email=quito
      //va a devolver los usuarios q tengan como email: "email": "marquitos2435679231@gmail.com", "email": "marquitos24356792341@gmail.com", etc
    }

    // vamos a hacer una ordenacion y paginacion x defecto:
    const orderAndPaginate = {
      limit: req.query.limit || 5,       //q cada pagina tenga 20 documentos
      page: req.query.page || 1,         //q arranque x defecto en la pagina 1
      //sort: { name: 1 }    //q lo ordene x nombre   (si quisiera ordenar x email: sort: { name: 1 })
    }

    /*if (req.query.name==="asc") {
      orderAndPaginate.sort.name = 1
    } else {
      orderAndPaginate.sort.name = -1
    }*/

    if (req.query.name==="desc") {        //estos considionales son necesarios para cuando hay q poner en particuplar 
      orderAndPaginate.sort.name = -1
    }

    const all = await users.read({filter, orderAndPaginate}); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});




usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readOne(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await users.update(uid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.destroy(uid);
    return res.json({
      statuscode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

//usersRouter.put("/:eid", async(req,res,next)=>{})
//usersRouter.delete("/:eid", async (req, res, next) => {});

export default usersRouter;
