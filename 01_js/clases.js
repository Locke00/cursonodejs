class Persona {
  static cantidadDePersonas = 0;
  static admin = "coderhouse"
  constructor(nombre, apellido, edad, ciudad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.ciudad = ciudad;
    Persona.agregarAlContador();
    this.ordenDeRegistro = Persona.cantidadDePersonas
  }
  imprimir() {
    console.log(this);
  }
  imprimirNombrecompleto = () => console.log(this.nombre, this.apellido);
  static agregarAlContador() {
    Persona.cantidadDePersonas++;
  }
  static conocerAdmin = ()=>console.log(Persona.admin);
}

const profe = new Persona("igna","borraz",33,"rosario")
profe.imprimir();
profe.imprimirNombrecompleto();

const tutor = new Persona("german","koning",30,"cordoba");
tutor.imprimir()
tutor.imprimirNombrecompleto();

//para acceder a propiedades de la instancia de la clase
console.log(tutor.ciudad);

//para acceder a propiedades estaticas de la clase
console.log(Persona.cantidadDePersonas);

Persona.agregarAlContador()
Persona.agregarAlContador()
Persona.agregarAlContador()


console.log(Persona.cantidadDePersonas);
Persona.conocerAdmin()

console.log(profe.ordenDeRegistro);
console.log(tutor.ordenDeRegistro);