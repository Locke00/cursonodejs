import jwt from "jsonwebtoken";

//el createToken va a usarse en el login
function createToken(data) {  // recibo como parametro la data a encriptar
  const token = jwt.sign(
    data, // data a encriptar (convertir a token)
    process.env.SECRET,     // llave de cifrado. puede ser la misma secret de las sesiones, pero no se recomienda
    { expiresIn: 60 * 60 * 24 * 7 } //fecha de caducidad de la contraseñas (es en segs)  (puse 7 dias)
  );
  return token; // sale un token
}

//en header se suelen enviar autorizaciones
//esta funcion devuelve la data q se habia cifrado dentro del token, en este caso, x ej el mail y el ro
function verifytoken(headers) {   //le tengo q pasar los headers, ya q los tokens se suelen pasar en los encabezamientos
  //headers es una de las propiedades de los requerimientos
  const token = headers.token; //tengo q evaluar si existe y si es correcto
  if (token) {
    const data = jwt.verify(token, process.env.SECRET); //sale un objeto q yo cifre con el createToken()
    //TAREA q pasa si no verifica (hay q mandar un error)
    return data;
  }
  const error = new Error("bad auth token");  //definimos un error con un constructore de errores
  error.statusCode = 401; //le seteamos el statusCode. pongo 401 xq no puedo identificar al usuario
  throw error;
}

export { createToken, verifytoken }
