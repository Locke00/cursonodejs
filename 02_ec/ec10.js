

//quitarle espacios a una cadena
let cadena = '    cadena q hay q quitarle los espacios adelante y atrás  '
console.log('--'+cadena+'--');  //muestra: --    cadena q hay q quitarle los espacios adelante y atrás  --
let cadenaTrim = cadena.trim()  //'tiene espacios adelante y atrás'
console.log('--'+cadenaTrim+'--'); //--cadena q hay q quitarle los espacios adelante y atrás--


//transformar un array anidado en un array plano
let arrayAnidado = ['hola',['como','estas','bien','bien!']]
let arrayFlat = arrayAnidado.flat()
console.log(arrayFlat); //[ 'hola', 'como', 'estas', 'bien', 'bien!' ]