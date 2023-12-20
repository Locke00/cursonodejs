let cuenta = 0;

function contador() {
  cuenta = cuenta + 10;
  console.log(cuenta);
}

contador();
contador();
contador();

const imprimir = (palabra) => console.log(palabra); // como tiene un solo argumento, no necesito ponerle el parentesis

const concatenar = (tercera, cuarta) => {
  let primera = "hola";
  let segunda = "mundo";
  console.log(primera, segunda, tercera, cuarta); // muestra:  hola mundo soy jose
  console.log(primera + " " + segunda + " " + tercera + " " + cuarta); // muestra:  hola mundo soy jose
  console.log(`${primera} ${segunda} ${tercera} ${cuarta}`); //mejor forma  // muestra:  hola mundo soy jose
};
imprimir("hola mundo!"); //imprime: hola mundo!
concatenar("soy", "jose");

const expresion = "--expresion_adicional--";

const cad1 = `texto de cadena de caracteres`;  
const cad2 = `Linea1 de caracteres
     Linea2 de caracteres`;
const cad3 = `texto de cadena de caracteres ${expresion} texto adicional`;

console.log(cad1);   // muestra: texto de cadena de caracteres
console.log(cad2);   // muestra: Linea1 de caracteres
                     //               Linea2 de caracteres
console.log(cad3);   // muestra: texto de cadena de caracteres --expresion_adicional-- texto adicional

//.map() : transforma cada elemento del array en otra cosa
//esta funcion flecha va a tomar cada elemento del arreglo pasado como parametro y lo va a transformar en otro arreglo del mismo tamaño
//solo q cada uno de sus elementos va a ser un objeto con dos propiedades: la propiedad valor q va a tener el valor q tenia ese elemento
// y la propiedad tipoDeDato q va a devolver el tipo de dato del q se trata
function corroborar(arreglo){
  const tipoDeDato = arreglo.map(cadaUno =>({valor: cadaUno, tipoDeDato: typeof cadaUno  }))
  console.log(tipoDeDato);
}

const resultado = corroborar([1,"hola",null,false])
/* devuelve:
[
  { valor: 1, tipoDeDato: 'number' },
  { valor: 'hola', tipoDeDato: 'string' },
  { valor: null, tipoDeDato: 'object' },
  { valor: false, tipoDeDato: 'boolean' }
] */

corroborar([NaN,undefined,true,imprimir,resultado])
/*[
  { valor: NaN, tipoDeDato: 'number' },
  { valor: undefined, tipoDeDato: 'undefined' },
  { valor: true, tipoDeDato: 'boolean' },
  { valor: [Function: imprimir], tipoDeDato: 'function' },
  { valor: undefined, tipoDeDato: 'undefined' }
]*/