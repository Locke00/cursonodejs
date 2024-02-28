import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { users } from "../data/mongo/manager.mongo.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
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
          let data = req.body;
          data.password = createHash(password);
          let user = await users.create(data);
          return done(null, user);
        }
        //en caso contrario NO DEJO re-registrar
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use("login", new LocalStrategy(
  { passReqToCallback: true, usernameField: "email"},
  async(req, email, password, done)=>{
    try {
      const user = await users.readByEmail(email)
      if (user) {
        const verify = verifyHash(password, user.password)
        if (verify) {
          req.session.email = email
          req.session.role = user.role
          return done(null,user)
        } else {
          done(null, false)
        }
      } else {
        return done(null, false)
      }
    } catch (error) {
      next(error)
    }

  }
));

export default passport;
