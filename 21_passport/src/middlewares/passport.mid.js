import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { users } from "../data/mongo/manager.mongo.js";
import { createToken } from "../utils/token.util.js";
const { GOOGLE_ID, GOOGLE_CLIENT } = process.env;

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
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        if (user) {
          const verify = verifyHash(password, user.password);
          if (verify) {
            //req.session.email = email;
            //req.session.role = user.role;
            const token = createToken({ email, role: user.role })
            req.token = token
            return done(null, user);
          } else {
            done(null, false);
          }
        } else {
          return done(null, false);
        }
      } catch (error) {
        next(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => { // en profile google me va a mandar unmonton de datos
      try {
        console.log(profile);
        let user = await users.readByEmail(profile.id);
        //Ahora vamos a guardar los datos del requerimiento con datos de la session
        if (user) {
          //primero lleno la session
          req.session.email = user.email; //(o en su lugar puedo poner profile.id, cualquiera va bien )
          req.session.role = user.role;
          return done(null, user);
        } else {
          user = {
            email: profile.id,
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            //password: createHash("hola1234")
            password: createHash(profile.id), //mas recomendado
          };
          user = await users.create(user);
          req.session.email = user.email;
          req.session.role = user.role;
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
