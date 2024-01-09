class Producto {
  #costo_unitario
  constructor(datos) {
      this.nombre = datos.nombre
      this.#costo_unitario = datos.precio * 0.6
      this.precio = datos.precio
      this.stock = datos.stock
  }
  #ganancia () {
      return this.precio - this.#costo_unitario
  }
  ganancia_potencial() {
      return this.#ganancia() * this.stock
  }
}

let cama = new Producto({ nombre:'cama',precio:10000,stock:2 })
console.log(cama)     //Muestra:         Producto { nombre: 'cama', precio: 10000, stock: 2 }
console.log(cama.nombre)                //cama
console.log(cama.costo_unitario)        //undefined, ya que es una variable privada
//console.log(cama.ganancia())          //error, ya q esa funcion al ser privada no puede ser llamada dsd fuera de la clase
console.log(cama.ganancia_potencial())  //8000