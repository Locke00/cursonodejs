//definimos una función (definida) flecha para la operación sumar
const sumar = (num1, num2) => num1 + num2;

//definimos una función (definida) tradicional para la operación restar
function restar(num1, num2) {
   return num1 - num2;
}

//definimos una función tradicional para recibir 3 parámetros
function calcular(num1, num2, operacion) {
   const resultado = operacion(num1, num2);
   console.log("el resultado es: " + resultado);
}

calcular(2,2,sumar)		//el resultado es: 4
calcular(2,2,restar)		//el resultado es: 0




//a la función calcular le podemos pasar directamente funciones anónimas:

//definimos una función flecha para la operación multiplicar
calcular(8, 2, (num1, num2) => num1 * num2);    //el resultado es: 16

//definimos una función tradicional para la operación dividir
calcular(8, 2, function (num1, num2) {          //el resultado es: 4
   return num1 / num2
});
