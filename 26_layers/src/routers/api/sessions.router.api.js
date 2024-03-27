import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import {
  register,
  login,
  google,
  github,
  me,
  signout,
  badauth,
} from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passCallBack("register"), register);
    //ya q passport se va a encargar de verificar el usuario y la contraseña
    //entonces login solo se va a encargar de manejar la respuesta:
    this.create("/login", ["PUBLIC"], passCallBack("login"), login);
    
    //google      , cuando vaya a este endpoint me va a llevar a la pantalla de consentimiento
    //si da exito, va a ir automaticamente al endpoint: /api/google/callback
    //como lo definimos en el parametro callbackURL, de la estrategia de google, q esta en passport.mid.js
    //lo voy a probar con get para probarlo con la url en el navegador
    //DEBE SER UN POST PARA LO Q EJECUTE EL EVENTO DE CLICK EN EL BOTON DE GOOGLE
    this.create(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    //el email, y q ponga todos los datos en profile
    ); // a este enpoint es q tengo q fetchear si quiero logearme usando el google

    // puedo ponerle post y lo mismo va a funcionar. pero es mas seguro q ande si le pongo un post
    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      google
    );
    this.create(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["email", "profile"] })
    );
    this.read(
      "/github/callback",
      ["PUBLIC"],
      passport.authenticate("github", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      github
    );
    this.create("/", ["USER", "ADMIN", "PREM"], me);
    this.create("/signout", ["USER", "ADMIN", "PREM"], signout);
    this.read("/badauth", ["PUBLIC"], badauth);
  }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();









 /*
//signout
//failureRedirect: "/api/sessions/signout/cb"  le agrego para q en caso q falle(x ej si intento desloguearme estando deslogueado, no me aparezca el error de unauthorized)
sessionsRouter.post(
  "/signout",
  //passport.authenticate("jwt", {
  //  session: false,
  //  failureRedirect: "/api/sessions/signout/cb",
  //}),
  passCallBack("jwt"),
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
*/