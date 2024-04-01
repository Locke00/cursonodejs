import passport from "passport";

export default (strategy) => {
  return async(req, res, next) => {
    passport.authenticate(strategy, (error, user, info)=>{
      ///console.log('222222')

      console.log({error, user, info});
      if (error) {
        return next(error)
      }
      if (!user) {   // usualmente no existe el usuario cuando tdvia no estoy autenticado
        return res.error401("No autenticado")
        /*return res.json({
          statusCode: info.statusCode || 401,    //401 porque lo estoy usando para autenticar. si lo utilizo para autorizar, ya deberia ser diferente el error
          message: info.messages || info.toString()  //xq a aveces lo puedo querer configurar manual, y entonces uso info.message. (jwt usualmente lo hace a toString())
        })*/

      }
      req.user = user  // si existe el usuario, guardamos el usuario en el objeto de requerimiento
      return next()  // luego hacemos next para q pase al middleware o a la funcion original

    })(req, res, next)   // esta funcion acabamos de codear la tenemos q ejecutar con los objetos req, res y next
  }
}