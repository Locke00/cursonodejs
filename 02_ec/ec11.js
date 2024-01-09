const edad = 20;

//operador ternario:
//(condicion) ? (que pasa si es verdadero) : (que pasa si es falso)
edad > 18 ? console.log("sos mayor de edad") : console.log("sos menos de edad");

//&& (retorna siempre el segundo elemento si la condicion es verdadera, sino, no devuelve nada)
//(condicion) && (esto se ejecuta si la condicion es verdadera)
edad > 18 && console.log("se esta imprimiendo este log solo si se cumple esta condicion");

//nullish ( ??)
// (variable) ?? (accion q se ejecuta si la variable es nullish(null o undefined))
const cero = 0;
cero ?? console.log("el valor 0 es null o undefined");       // no deuvelve nada
const nula = null;
nula ?? console.log("el valor null es null o undefined");    // devuelve "el valor null es null o undefined"
const noDefinida = undefined;
noDefinida ?? console.log("el valor undefined es null o undefined");  // devuelve "el valor undefined es null o undefined"
const falso = false;
falso ?? console.log("el valor false es null o undefined");  // no devuelve nada


let nroCero = 0
let nulo = null
let no_definido = undefined


//otro uso, le da un valor x defecto a una variable si es null o indefinido(si es nullish):
// si nroCero no es nullish, conserva su valor. si es nullish, se le asigna el valor q se pasa como parametro dsp del ??
nroCero = nroCero ?? 'se reasigna si es nulo/indefinido'   // nroCero sigue valiendo 0, ya q no se nullish
console.log(nroCero);                     //muestra 0

nulo = nulo ?? 'es nulo/indefinido'       // nulo cambia su valor a 'es nulo/indefinido'
console.log(nulo);

no_definido = no_definido ?? { type: 'null/undefined' }  // no_definido cambiara su valor a { type: 'null/undefined' }
console.log(no_definido);

