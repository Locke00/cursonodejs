//import "dotenv/config.js";
import { faker } from "@faker-js/faker";
import repository from "../../repositories/products.rep.js";
//import dbConnection from "../../utils/dbConnection.util.js";
//import dbUtils from "../../utils/db.utils.js";



export default function productsMock() {
  return {
    title: faker.commerce.productName(),
    photo: faker.image.urlPicsumPhotos(),
    price: (faker.number.int(100))*100,
    stock: faker.number.int(100)
  };
}

async function createMocks() {
  try {
    const data = productsMock();
    //console.log(data);
    await repository.create(data); 
    //const product = await repository.create(data); //obtengo la info del usuario creado
    //for (let i=1; i<=10; i++) {
    //  await createNote(user.id)  //y, usando su id, creo 10 notas asociadas a ese usuario
    //}
    //console.log("USER CREATED!");
  } catch (error) {
    console.log(error);
  }
}


for (let i=1; i<=99; i++) {
  createMocks();                //creo 10 productos
}
console.log("DATA MOCKED!");

