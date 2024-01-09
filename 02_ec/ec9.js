const datos = {
  nombre: "jose",
  apellido: "perez",
  edad: "40",
};

const datosExtras = {
  ciudad: "San Miguel de Tuc",
  nacimiento: 1982,
};

const objetosUnidos = { ...datos, ...datosExtras };
//console.log(objetosUnidos)

/* genera la salida: 
{
nombre: 'jose',
apellido: 'perez',
edad: '40',
ciudad: 'San Miguel de Tuc',
nacimiento: 1982
} */
// el spread operator se usa en objetos(como en el ej. de arriba, como con arrys(ej de abajo))

const array1 = [1, 2, 3, 4];
const array2 = [10, 20, 30, 40];
const arrayUnidos = [...array1, ...array2];
//console.log(arrayUnidos)

/* generara:
[
 1,  2,  3,  4,
10, 20, 30, 40
]  */

//el spread operator esta muy relacionado al estructuring y desesctructuring

//usando desestructuring puedo sacar variables de dentro de un objeto. la condicion es q el nombre de la variable q quiero crear tiene q tener el mismo
//nombre de la variable que quiero extraer
//const nombre = objetosUnidos.nombre
const { nombre } = objetosUnidos;
console.log(nombre);

//ademas, se pueden sacar mas de una variable en la misma linea
//const {apellido,edad,nacimiento} = objetosUnidos
//alternativamente podemos usar el sread operator agregar el parametro rest, el cual puede tener cualquier nombre. en este caso se llama 'restoDePropiedades'
//va a contener el resto de pripedades q no se asignaron a las variables
const { apellido, edad, nacimiento, ...restoDePropiedades } = objetosUnidos;

console.log(apellido);         // muestra perez
console.log(edad);             // muestra 40
console.log(nacimiento);       // muestra 1982
console.log("resto de propiedades: ");
console.log(restoDePropiedades); // muestra { nombre: 'jose', ciudad: 'San Miguel de Tuc' }

//la desestructuracion tb sirve para arreglos

//estructuracion: contruye un objeto en base a propiedades q se llaman como la variable

console.log("Usando estructuring:");
const poder = "inteligencia";
const pseudonimo = "iron man";
const equipo = "vengadores";
const heroe = { poder, pseudonimo, equipo };
console.log(heroe); //muestra el contenido del objeto: { poder: 'inteligencia', pseudonimo: 'iron man', equipo: 'vengadores' }
