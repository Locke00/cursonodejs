import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPassword from "../../middlewares/isValidPass.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js"

const sessionsRouter = Router();

//register
//(<nombre_del_endpound>, (cheaquear q la contraseña tenga 8 caracteres), <middleware con la estrategia de registro>, <callback>  )
// ademas, passport se encarga de la creacion del usuario, xq lo q ya no tengo q ponerlo en el cuerpo de este endpoint
// failureRedirect: permite redireccionar en caso q haya habido un problema
sessionsRouter.post(
  "/register",
  has8char,
  /*passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),*/
  passCallBack("register"),
  async (req, res, next) => {
    //session: false  // permite q no sea necesario hacer un serializado. q el usuario no se transforme en un id, y dsp en un usuario, etc...
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login
//ya q passport se va a encargar de verificar el usuario y la contraseña
//entonces login solo se va a encargar de manejar la respuesta:
sessionsRouter.post(
  "/login",
  /*passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),*/
  passCallBack("login"),
  async (req, res, next) => {
    try {
      // httpOnly: true   permite q no se pueda acceder a la cookie dsd el navegador
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in",
          //session: req.session, no voy a devolver la sesion
        });
    } catch (error) {
      return next(error);
    }
  }
);

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
//failureRedirect: "/api/sessions/signout/cb"  le agrego para q en caso q falle(x ej si intento desloguearme estando deslogueado, no me aparezca el error de unauthorized)
sessionsRouter.post(
  "/signout",
  /*passport.authenticate("jwt", {  //este bloque lo comento xq ya no lo usar, sino q en su lugar usaré passCallBack("jwt")
    session: false,
    failureRedirect: "/api/sessions/signout/cb",
  }),*/
  passCallBack("jwt"),  //en el parentesis el paso eltipo de estrategi
  async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "Already done",
    });
  } catch (error) {
    next(error);
  }
});

sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "Bad auth",
    });
  } catch (error) {
    next(error);
  }
});

//google      , cuando vaya a este endpoint me va a llevar a la pantalla de consentimiento
//si da exito, va a ir automaticamente al endpoint: /api/google/callback
//como lo definimos en el parametro callbackURL, de la estrategia de google, q esta en passport.mid.js
//lo voy a probar con get para probarlo con la url en el navegador
//DEBE SER UN POST PARA LO Q EJECUTE EL EVENTO DE CLICK EN EL BOTON DE GOOGLE
sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }) // cuando pongo asi el scope le digo q tome como parametro principal
  //el email, y q ponga todos los datos en profile
); // a este enpoint es q tengo q fetchear si quiero logearme usando el google

//google-callback
sessionsRouter.get(
  // puedo ponerle post y lo mismo va a funcionar. pero es mas seguro q ande si le pongo un post
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with google! ",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default sessionsRouter;
