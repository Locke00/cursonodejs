//import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";


import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPassword  from "../../middlewares/isValidPass.mid.js"
import passport from "../../middlewares/passport.mid.js";
import CustomRouter from "../CustomRouter.js";

//const sessionsRouter = Router();

export default class SessionsRouter extends CustomRouter{
  init(){
        //register
    //(<nombre_del_endpound>, (cheaquear q la contraseña tenga 8 caracteres), <middleware con la estrategia de registro>, <callback>  )
    // ademas, passport se encarga de la creacion del usuario, xq lo q ya no tengo q ponerlo en el cuerpo de este endpoint
    // failureRedirect: permite redireccionar en caso q haya habido un problema
    this.create(  //post
      "/register",
      ["PUBLIC"],
      /*has8char,
      passport.authenticate("register", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),*/
      passCallBackMid("register"),
      async (req, res, next) => {
        //session: false  // permite q no sea necesario hacer un serializado. q el usuario no se transforme en un id, y dsp en un usuario, etc...
        try {
          return res.success200("Registered")
/*          return res.json({
            statusCode: 201,
            message: "Registered!",
          });*/
        } catch (error) {
          return next(error);
        }
      }
    );
    
    
    
    
    //login   //ej de usuario: franco3@gmail.com/hola1234
    //ya q passport se va a encargar de verificar el usuario y la contraseña
    //entonces login solo se va a encargar de manejar la respuesta:
    this.create(  //post
      "/login",
      ["PUBLIC"],
      passCallBackMid("login"),
      /*passport.authenticate("login", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),*/
      async (req, res, next) => {
        try {
          console.log('111111111')
          return res
            .cookie("token", req.token, {        // el valor del token esta en el objeto requerimientos
              maxAge: 7 * 24 * 60 * 60,
              httpOnly: true,  // httpOnly: true   permite q no se pueda acceder a la cookie dsd el navegador
            })   // esto permite q cuando se loguee bien al usuario se le cree el cookie 
            .success200("Logged in")
        } catch (error) {
          return next(error);
        }
      }
    );
    
    
    
    
    //me,   vamos a hacer un post para ver mis datos de sesion
    this.create("/", async (req, res, next) => {  //post
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



    /*//signout
    sessionsRouter.post("/signout", async (req, res, next) => {
      try {
        req.logout();
        return res.json({
          statusCode: 200,
          message: "Signed out",
        });
      } catch (error) {
        return next(error);
      }
    });*/

    /*    this.create("/signout", ["PUBLIC"], async (req, res, next) => { //post
      try {
        return res.clearCookie("token").success200("Signed out");
        //json({  //tengo q eliminar la cookie
        //  statusCode: 200,
        //  message: "Signed out",
        //  //session: req.session, no voy a devolver la sesion
        //});
      } catch (error) {
        return next(error);
      }
    });*/


    //signout
    //failureRedirect: "/api/sessions/signout/cb"  le agrego para q en caso q falle(x ej si intento desloguearme estando deslogueado, no me aparezca el error de unauthorized)
    this.create(
      "/signout",
      ["PUBLIC"],
      /*passport.authenticate("jwt", {
        session: false,
        failureRedirect: "/api/sessions/signout/cb",
      }),*/
      passCallBackMid("jwt"),
      async (req, res, next) => {
        try {
          return res.clearCookie("token").success200("Signed out")
        } catch (error) {
          return next(error);
        }
      }
    );
    
    this.read("/signout/cb", ["PUBLIC"], (req, res, next) => {
      try {
        return res.error400("Already done")
      } catch (error) {
        next(error);
      }
    });

    this.read(
      "/me",
      ["PUBLIC"],
      /*passport.authenticate("jwt", {
        session: false,
        failureRedirect: "/api/sessions/signout/cb",
      }),*/
      passCallBackMid("jwt"),
      async (req, res, next) => {
        try {
          console.log('---start--');
          console.log(req);
          console.log('---end--');
          let user = req.user
          return res.success200(user)
        } catch (error) {
          return next(error);
        }
      }
    );







    this.read("/badauth", (req, res, next) => { //get
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
    this.create(   //post
      "/google",
      passport.authenticate("google", { scope: ["email", "profile"] }) // cuando pongo asi el scope le digo q tome como parametro principal
      //el email, y q ponga todos los datos en profile
    ); // a este enpoint es q tengo q fetchear si quiero logearme usando el google
    
    //google-callback
    this.read(    //get
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
    
    


  }


}


