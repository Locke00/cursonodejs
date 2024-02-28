import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPassword from "../../middlewares/isValidPass.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

//register
//(<nombre_del_endpound>, (cheaquear q la contraseña tenga 8 caracteres), <middleware con la estrategia de registro>, <callback>  )
// ademas, passport se encarga de la creacion del usuario, xq lo q ya no tengo q ponerlo en el cuerpo de este endpoint
// failureRedirect: permite redireccionar en caso q haya habido un problema
sessionsRouter.post("/register", has8char, passport.authenticate("register", {session: false, failureRedirect: "/api/sessions/badauth"}), async(req, res, next)=>{
  //session: false  // permite q no sea necesario hacer un serializado. q el usuario no se transforme en un id, y dsp en un usuario, etc...
  try {
    return res.json({
      statusCode: 201,
      message: "Registered!"
    })
    
  } catch (error) { 
    return next(error)
  }
})

//login
//ya q passport se va a encargar de verificar el usuario y la contraseña
//entonces login solo se va a encargar de manejar la respuesta:
sessionsRouter.post("/login", passport.authenticate("login", {session: false, failureRedirect: "/api/sessions/badauth"}), async (req, res, next) => {
  try {
    return res.json({
      statusCode: 200,
      message: "Logged in",
      session: req.session,
    });
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

sessionsRouter.get("/badauth", (req, res, next)=>{
  try {
    return res.json({
      statusCode: 400,
      message: "Bad auth"
    })
  } catch (error) {
    next(error)
  }
})


export default sessionsRouter;
