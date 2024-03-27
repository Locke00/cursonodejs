//acá vamos a definir distintos procesos de nuestro server

process.on("exit", (code) =>    //casi siempre recibe el codigo con q cierra el proceso. (ej: 0: termina ok, 2: finaliza error fatal)
  console.log("el proceso terminó con código " + code)  // este console.log se va a ejecutar cada vez q finalize la ejecucin
);

process.on("uncaughtException", (error) =>     //llama una callback, cuyo argumento es el error
  console.log("ha ocurrido un error: " + error.message)
);

console.log(process.pid);
process.exit(1);
