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
