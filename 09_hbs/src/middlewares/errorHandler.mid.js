
//su objetivo es enviarle al cliente una respuesta con el codigo de estado q corresponda, y un mensaje con la ruta, la url y el 
//mensaje q esta ocurriendo(xej:tal variable no existe, tal metodo no se puede ejecutar)
//funciona si usas next, en los enrutadores
function errorHandler(error, req, res, next) {
  console.log(error);
  return res.json({
    statusCode: error.statusCode || 500,
    message: `${req.method} ${req.url} ${error.message}`
  })
}

export default errorHandler