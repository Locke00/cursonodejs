

//const fs = require("fs");  //old syntaxis
import fs from 'fs';      //new syntaxis

//const crypto = require("crypto"); old
import crypto from "crypto"


//const ruta = "./sprints/sprint2/fs/data/products.Fs.json";
//const configuracion = "utf-8";
//let nextId;
//let productsArray,nextId,productsFs,producto

class ProductManager {
  static #products = []
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        ProductManager.#products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    //ProductManager.#products = [];
    this.init();
  }
  async create(data) {
    try { 
      if (!data.title) {
        throw new Error("title is required");
      }
      //      nextId = productsArray.length+1
      //nextId = 1;

      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      ProductManager.#products.push(product);
      const jsonData = JSON.stringify(ProductManager.#products, null, 2);

      await fs.promises.writeFile(this.path, jsonData); //all poner await, debo poner async a la funcion donde esta esta instruccion
      console.log(product.id);
      return product.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("The are no products!");
      } else {
        console.log(ProductManager.#products);
        return ProductManager.#products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any product");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async destroy(id) {
    try {
      const one = ProductManager.#products.find((each)=> each.id === id)
      if (one) {
        ProductManager.#products = ProductManager.#products.filter(
          (each)=>each.id !== one.id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        )
        console.log("Destroy ID: "+id);
        return one;
      } else {
        throw new Error("there is no product");
      }

    } catch (error){
      console.log(error.message);
      return error.message
    }
  }

  async update(id, data) {
    try {
      const productIndex = ProductManager.#products.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        throw new Error("Product not found");
      }

      const updatedProduct = {
        ...ProductManager.#products[productIndex],
        ...data,
        id: ProductManager.#products[productIndex].id, // Mantener el mismo ID
      };

      ProductManager.#products[productIndex] = updatedProduct;

      await fs.promises.writeFile(this.path, JSON.stringify(ProductManager.#products, null, 2));

      console.log("Product updated successfully");
      return updatedProduct;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }



}

const products = new ProductManager("./src/data/fs/files/products.Fs.json");
export default products


//console.log(products.read());

/*products.create({
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
*/

//console.log(products.read());
//console.log(products.readOne("2464fa95246cbd5050e3a466"));
//await products.read();
//await products.readOne("4a9d62ebb7c4ac575cede2ab");
//await products.destroy("4a9d62ebb7c4ac575cede2ab");
//await products.readOne("4a9d62ebb7c4ac575cede2ab");

//console.log(products.destroy("8f2f1521de5e417e989f98cf"));
