import { verifytoken } from "../utils/token.util.js";

export default (req, res, next) => {
  try {
    //console.log(req.user);
    //const token = req.cookies.token
    //console.log(token);
    //const userData = verifytoken(token)
    //const { role } = userData;
    //console.log(role);
    //console.log("rol-end:");
    const { role } = req.user;  //aqui, al haber usando passport-jwt antes, no necesitamos sacar la info del usuario, del token
    console.log(req.user);
    if (role === 1 ) {
      return next();
    } else {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
