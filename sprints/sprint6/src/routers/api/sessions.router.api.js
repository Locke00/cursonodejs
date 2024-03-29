import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";

import has8char from "../../middlewares/has8char.mid.js";
import isValidPassword  from "../../middlewares/isValidPass.mid.js"

const sessionsRouter = Router();

//register
sessionsRouter.post("/register", has8char, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
    if (response === "user is required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        message: "Registered!" //cuando el nombre de la propiedad es igual al nombre de la variable
                  //directamente pongo el nombre de la variable(a esto se le llama estructuracion)
        //response: response es lo mismo q lo de arriba
        //el codigo 200 envia una respuesta,
        //el codigo 201 no envia ninguna respuesta
      });
    }
  } catch (error) {
    return next(error);
  }
  
});



//login
sessionsRouter.post("/login", isValidPassword, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      //pongo q se le haya enviado el email
      req.session.email = email; //setea como variable de session, el email pasado como parametro
      req.session.role = "admin"  //el rol se esta hardcodeando, pero luego hay q buscarlo en mongo
                    // para saber el role real del usuario q inició la sesion
      return res.json({
        statusCode: 200,
        message: "Logged in",
        session: req.session,
      });
    }
    const error = new Error("Bad auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

//me,   vamos a hacer un post para ver mis datos de sesion
sessionsRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "Session with email: " + req.session.email,
        //session: req.session,
      });
    } else {
      const error = new Error("Bad Auth");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

//signout
sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Signed out",
      });
    } else {
      const error = new Error("Bad Auth");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
