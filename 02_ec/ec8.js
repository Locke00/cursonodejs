
// sea el objeto:
let datos = {
  nombre:'ignacio',
  apellido:'borraz',
  edad:'32'
}

//Object.key(-objeto-) : muestra las claves del objeto
let claves = Object.keys(datos)
console.log("claves:");
console.log(claves);  //muestra: [ 'nombre', 'apellido', 'edad' ]

//Object.values(-objeto-) : muestra los valores q tienen los elementos del objeto
let valores = Object.values(datos)
console.log("valores:");
console.log(valores);  //muestra: [ 'ignacio', 'borraz', '32' ]

//Object.values(-objeto-) : muestra los valores q tienen los elementos del objeto
let clavesYvalores = Object.entries(datos)
console.log("Claves y Valores:");
console.log(clavesYvalores);  //muestra: [ [ 'nombre', 'ignacio' ], [ 'apellido', 'borraz' ], [ 'edad', '32' ] ]
