class ProductManager {
  static products = [];
  constructor() {}
  create(data) {
    const product = {
      id:
        ProductManager.products.length === 0
          ? 1
          : ProductManager.products[ProductManager.products.length - 1].id + 1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };
    ProductManager.products.push(product);
  }
  read() {
    return ProductManager.products;
  }
  readOne(id) {
    return ProductManager.products.find((each) => each.id === Number(id));
  }
}

const products = new ProductManager();

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

console.log('Output of products.read():  ');
console.log(products.read());
console.log('Output of products.readOne(2):  ');
console.log(products.readOne(2));

