import { Router } from "express";

const cookiesRouter = Router();

//para setear cookies
cookiesRouter.get("/set/:modo", async (req, res, next) => {
  try {
    const { modo } = req.params;
    const maxAge = 60000 * 5; // (en milisegundos)
    const signed = true;
    return res
      .cookie("modo", modo, { maxAge })
      .cookie("sessionId", "hola1234", { maxAge, signed }) //pasa otra cookie, pero esta si esta firmada
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
