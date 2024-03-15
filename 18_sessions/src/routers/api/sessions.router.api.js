import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";

const sessionsRouter = Router();





//login
sessionsRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;  // ya q es una peticion post, la info normalmente me viene en el body //desestructuro
    if (email && password === "hola1234") { //si el campo email noviene vacio, y la contraseña es la indicada, hago q continue
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

//me,   vamos a hacer un post para ver mis datos de sesion, si es q hay una sesion activa
sessionsRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {  // si existe ese dato
      return res.json({
        statusCode: 200,
        message: "Session with email: " + req.session.email,
        //session: req.session,
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);  //para q el manejador de errores mande el error predefinido
  }
});

//signout
sessionsRouter.post("/signout", async (req, res, next) => {  //acá, aunq no necesito q sea asyncrono lo pongo asi, ya q dsp voy a usar en conjunto
  try {             //con mongo, y ahi si tengo q esperar
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Signed out",
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
