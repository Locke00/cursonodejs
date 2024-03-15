export default (req, res, next) => {
  try {
    console.log(req.session);
    //const { role } = req.body; //es raro enviar en el body el rol o el id
    const { role } = req.session; //es tomarlo de la sesion. el seteo de req.session se hace normalmente en el endpoint del login
    console.log(role);
    if (role === "admin") {
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
