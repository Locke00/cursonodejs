//dividirConPromesa es una fusión de dividir+funcionManejadoraDeError
function dividirConPromesa(n1, n2) {
  return new Promise((resolve, reject) => {
    if (n1 && n2 !== 0) {
      resolve("El resultado de la operación es: " + n1 / n2);
    } else {
      reject("Ocurrio el error: no existe n1 o n2 es cero");
    }
  });
}


function elevadoa(num1, num2, funcionManejadoraDeError) {
  if ((num1 || num1 === 0) && (num2 || num2 === 0)) {
    return funcionManejadoraDeError(null, num1 ** num2);
  } else {
    return funcionManejadoraDeError("faltan parámetros");
  }
 }

//el objetivo de usar PROMESAS es no depender de esta callback


//esta funcion es asyncrona, hay q esperar q se resuelva antes de seguir, x eso agregamos en async-await
//ademas, al async-await, le agregamos el try-catch, para q atrape el error
async function calcular(num1, num2, operacion) {
  //operacion(num1,num2,funcionManejadoraDeError)
  try {
    console.log(await operacion(num1, num2));
  } catch (error) {
    console.log(error);
  }
}


//calcular(10,"a",dividir)
//calcular(10,0,dividir)
//calcular(2,5,elevadoa)
//calcular(2,null,elevadoa)

calcular(10, 5, dividirConPromesa);  //El resultado de la operación es: 2
calcular(10, 0, dividirConPromesa);  //Ocurrio el error: no existe n1 o n2 es cero


function calcularConThenCatch(num1, num2, operacion) {
  operacion(num1, num2)
    .then((respuesta) => {
      console.log(respuesta);   // muestra, en el caso1: El resultado de la operación es: 5
      return "primer then";
    })
    .then((res) => {
      console.log(res);         // muestra, en el caso1: primer then
      return "segundo then";
    })
    .then((respuesta) => console.log(respuesta))    // muestra, en el caso1: segundo then
    .catch((error) => console.log(error));   // cualquier error q ocurra va a ser catcheado x este catch
}

calcularConThenCatch(15, 3, dividirConPromesa);  
calcularConThenCatch(0, 0, dividirConPromesa);  //Ocurrio el error: no existe n1 o n2 es cero

