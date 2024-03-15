import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { users } from "../data/mongo/manager.mongo.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {  // email y passport los envio x el body al enpoint /register q usa esta estrategi
      //async porque hare muchas consulas. si fuera en memoria no seria necesario el sync
      try {
        //verifico q el usuario no existe
        //hasheo la contraseña
        //registra elusuario
        //let one = await users.readByEmail(req.body.email)   //let xq le tengo q cambiar la contraseña. puedo hacerlo alternativamente con la linea de abajo
        let one = await users.readByEmail(email); //puedo buscar el email del requerimiento o de la misma callback(xq email === req.body.email)
        if (one) {
          done(null, false); //si el usuario existe no puedo re-registrarlo, x lo tanto la estrategia termina aca
        } else {
          let data = req.body;   // toma los datos del usuario del body
          data.password = createHash(password); //crea el hash de la contraseña, y lo agrega al objeto datos
          let user = await users.create(data);  //crea el usuario
          return done(null, user);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use("login", new LocalStrategy(
  { passReqToCallback: true, usernameField: "email"},  // objeto de configuracion. usernameField: "email" cambia el campo principal, de username a email
  async(req, email, password, done)=>{     //callback, se va a encargar de hacer la autenticación
    try {
      const user = await users.readByEmail(email)
      if (user) {  // si encuentra el usuario
        const verify = verifyHash(password, user.password)  //password es la contraseña q viene de los requerimiento
        if (verify) {
          req.session.email = email  //seteo los datos de serion
          req.session.role = user.role
          return done(null,user) //devuelvo el error=null y devuelvo los datos del usuario
        } else {
          done(null, false)  // devuelvo error=null, pero no te dejo logear xq pusiste mal la contraseña
        }
      } else {
        return done(null, false) // devuelvo error=null xq no ocurrio error, pero no dejo loguear un usu q no existe
      }
    } catch (error) {
      //next(error)
      done(error)
    }
  }
));

export default passport;
