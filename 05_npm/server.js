


const http = require('http')
//requiero el modulo necesario para gestionar servidores (crearlo, configurarlo y levantarlo)


const server = http.createServer() //metodo para crear un servidor

//para iniciar el server necesito 2 parametros
  //puerto donde va a funcionar el server (8080)
  const PORT = 8080
  //cb para informarnos q el server esta funcionado
  //importante: recomiendo q se muestre x consola el puerto donde esta escuchando el server
  const cbReady = ()=>console.log('server ready on port '+PORT)

  //listen es el metodo necesario para inciar el server
  server.listen(PORT,cbReady)
