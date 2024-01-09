const numero = 5
const exponente = 3
const res1 = numero ** exponente
console.log(numero+'^'+exponente+'='+res1);   // mostrará: 5^3=125



// object.includes(-cadena-) :  se usa para ver si una cadena se encuentra en una cadena o en un arreglo
let palabra1 = 'bet'
let palabra2 = 'beto'
let arrayPalabras = ['alfa','beto','beta','delta','alfabeto']
let incluye_al = palabra1.includes('al')                    	//false
let incluye_bet = palabra2.includes(palabra1)               	//true
let incluye_palabra1 = arrayPalabras.includes(palabra1)     	//false  //en el caso de arreglos tiene q estar presente
                                                                       //la palabra completa
let incluye_palabra2 = arrayPalabras.includes(palabra2)     	//true