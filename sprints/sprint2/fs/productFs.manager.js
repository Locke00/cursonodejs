const fs = require("fs");

const ruta = "./sprints/sprint2/fs/data/products.Fs.json";
const configuracion = "utf-8";
let productsArray,nextId,productsFs,producto


class ProductManager {
  constructor() {}
  create(data) {
    fs.promises
      .readFile(ruta,configuracion)
      .then((productsFs)=>{
        productsArray = JSON.parse(productsFs)
        nextId = productsArray.length+1

        const product = {
          id: nextId,
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };
        productsArray.push(product);
        productsFs = JSON.stringify(productsArray,1,2)
        fs.promises.writeFile(ruta,productsFs)
          .then(res=>console.log('se escribio bien'))
          .catch(error=>console.log('ocurrio un error'))
      })
      .catch((error)=> console.log(error));

  }
  read() {
    fs.promises
      .readFile(ruta,configuracion)
      .then((productsFs)=>{
        productsArray = JSON.parse(productsFs)
        console.log(productsArray);
      })
  }
  readOne(id) {
    fs.promises
    .readFile(ruta,configuracion)
    .then((productsFs)=>{
      productsArray = JSON.parse(productsFs)
      producto = productsArray.find((each) => each.id === Number(id));
      console.log(producto);
    })

  }
}

const products = new ProductManager();


let producto1 = [{
  title: "casa",
  photo: "http://www.multimarcas.com/casa.jpg",
  price: 3000,
  stock: 5,
}  ]





products.create({
  title: "casa",
  photo: "http://www.multimarcas.com/casa.jpg",
  price: 3000,
  stock: 5,
});


products.create({
  title: "auto",
  photo: "http://www.multimarcas.com/auto.jpg",
  price: 1000,
  stock: 5,
});
products.create({
  title: "moto",
  photo: "http://www.multimarcas.com/auto.jpg",
  price: 500,
  stock: 5,
});


console.log(products.read());
console.log(products.readOne(3));
