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
      console.log('11111111')
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
        if (user && verifyHash(password, user.password)) {
          //estos dos los comento xq voy a hacer q las sesiones las maneje jwt
          //req.session.email = email;
          //req.session.role = user.role;
          
          const token = createToken({ email, role: user.role });  //crea el token con jwt
          console.log("creado el token");
          req.token = token;
          
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "signout",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        if (user && verifyHash(password, user.password)) {
          //estos dos los comento xq voy a hacer q las sesiones las maneje jwt
          //req.session.email = email;
          //req.session.role = user.role;
          req.logout()
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);




//estategia de google:
passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true, //true para q la estrategia tenga acceso al objeto de requerimientos
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      // en profile google me va a mandar unmonton de datos del usuario
      //tb da un accessToken y refreshToken(me los devuelve para q los use en caso de necesidad)
      try {
        console.log(profile);
        let user = await users.readByEmail(profile.id); // primero veo si ya el usuario se creo anteriormente
        //Ahora vamos a guardar los datos del requerimiento con datos de la session
        if (user) {
          //primero lleno la session
          req.session.email = user.email; //(o en su lugar puedo poner profile.id, cualquiera va bien )
          req.session.role = user.role;
          return done(null, user); // si existe el usuario, lo logueo
        } else {
          // si no existe el usuario, lo registro y lo logueo
          user = {
            // primero completo los valores del usuario
            email: profile.id, //esta es la propiedad q mas me interesa
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            //password: createHash("hola1234")
            password: createHash(profile.id), //mas recomendado
          };
          user = await users.create(user); //creo el usuario
          req.session.email = user.email; //pongo sus datos como variable de sesion
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
