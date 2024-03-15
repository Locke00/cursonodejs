import { Router } from "express";

const cookiesRouter = Router();

//para setear cookies
//se llama de la siguiente forma: http://localhost:8080/api/cookies/set/nocturno . entonces, a la clave modo le va a poner el valor  de lo q venga
//segun el ejemplo, haria q el modo sea nocturno
cookiesRouter.get("/set/:modo", async (req, res, next) => {  //con el endpoint /set vamos a llamar a la funcion asyncrona, q va a recibir 3 parametros
  try {    //el parametro q voy a recibir se llamara modo
    const { modo } = req.params; //lo desestructuro
    const maxAge = 60000 * 5; // (en milisegundos)
    const signed = true;
    return res   //para setear la cookie debo configurar la respuesta
      .cookie("modo", modo, { maxAge })  //en este caso, el valor q se le va a definir a la cookie es el q capturo del parametro(:modo)
      .cookie("sessionId", "hola1234", { maxAge, signed }) //pasa otra cookie, pero esta si esta firmada. puedo concatenar todas las cookies q quiera
      .json({
        statusCode: 200,
        message: "Cookie configurada - Modo: " + modo,
      });
  } catch (error) {
    return next(error);
  }
});

//para leer cookies
//cookies
//la puedo leer de la siguiente forma:
cookiesRouter.get("/get", async (req, res, next) => {
  try {
    const modo = req.cookies.modo;
    const sessionId = req.signedCookies.sessionId;
    return res.json({
      //.status(200)  mientras yo no declare esto acá, seguira siendo stateless. la API es REST (stateless)
      statusCode: 200,
      response: {
        modo,
        sessionId,
      },
    });
  } catch (error) {
    return next(error);
  }
});
//si la cookie no expiró, devolveria:
//{
//  "statusCode": 200,
//  "response":   {
//    "modo": "nocturno",
//    "sessionId": "hola1234"
//  }
//}


cookiesRouter.get("/clear", async (req, res, next) => {
  try {
    return res
      .clearCookie("modo")
      .clearCookie("sessionId")
      .json({
        statusCode: 200,
        response: {
          modo: req.cookies.modo,
          sessionId: req.signedCookies.sessionId,
        },
      });
  } catch (error) {
    return next(error);
  }
});

//para eliminar cookies

export default cookiesRouter;
