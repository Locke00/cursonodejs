class SessionsController {
  register = async (req, res, next) => {
    try {
      return res.success201("Registered");
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, { // el valor del token esta en el objeto requerimientos
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,// httpOnly: true   permite q no se pueda acceder a la cookie dsd el navegador
        })  // esto permite q cuando se loguee bien al usuario se le cree el cookie 
        .success200("Logged in");
    } catch (error) {
      return next(error);
    }
  };
  /*me = async (req, res, next) => {  //post
    try {
      if (req.user) {
        return res.success200("User logged with email: " + req.user.email)
      } else {
        return res.error400("No esta logueado")
      }
    } catch (error) {
      return next(error);
    }
  }*/


  google = async (req, res, next) => {
    try {
      return res.success200("Logged in with Google!");
    } catch (error) {
      return next(error);
    }
  };
  github = async (req, res, next) => {
    try {
      return res.success200("Logged in with Github!");
    } catch (error) {
      return next(error);
    }
  };
  me = async (req, res, next) => {
    try {
      console.log(req.user);
      const user = {
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
      };
      return res.success200(user);
    } catch (error) {
      return next(error);
    }
  };
  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").success200("Signed out!");
    } catch (error) {
      return next(error);
    }
  };
  badauth = (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionsController;
const controller = new SessionsController();
const { register, login, google, github, me, signout, badauth } = controller;
export { register, login, google, github, me, signout, badauth };
