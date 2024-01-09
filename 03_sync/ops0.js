function dividir(n1, n2, funcionManejadoraDeError) {
  //primero tengo q proceder a hacer un control
  if (n1 && n2 !== 0) {
    //si existe n1, y si existe n2, y ese n2 es distinto de 0, significa q esta ok, q se puede hacer
    //la operacion
    funcionManejadoraDeError(null, n1 / n2);
  } else {
    // else se ejecuta si se produce un error
    funcionManejadoraDeError("n1 no existe o n2 es cero");
  }
}

function elevadoa(num1, num2, funcionManejadoraDeError) {
  if ((num1 || num1 === 0) && (num2 || num2 === 0)) {
    // si existe cada parametro o ese parametro es igual a 0
    return funcionManejadoraDeError(null, num1 ** num2);
  } else {
    return funcionManejadoraDeError("faltan parámetros");
  }
}

//primer parametro es q pasa si ocurre un error, y el 2do parametro es q pasa si ocurre el exito
function funcionManejadoraDeError(error, exito) {
  if (error) {
    console.log("Ocurrio el error:", error);
  } else {
    //idealmente se prefiere q se retorne algo, pero x simplicidad vamos a hacer un console.log()
    console.log("El resultado de la operación es:", exito);
  }
}
//el objetivo de usar PROMESAS es no depender de esta callback

function calcular(num1, num2, operacion) {
  operacion(num1, num2, funcionManejadoraDeError);
}

calcular(10, 2, dividir);    //El resultado de la operación es: 5
calcular(10, 0, dividir);    //Ocurrio el error: n1 no existe o n2 es cero
calcular(2, 5, elevadoa);    //El resultado de la operación es: 32
calcular(2, null, elevadoa); //Ocurrio el error: faltan parámetros


/*
 async function calcular(num1, num2, operacion) {
  //operacion(num1,num2,funcionManejadoraDeError)
  try {
    console.log(await operacion(num1, num2));
  } catch (error) {
    console.log(error);
  }
} 
*/
