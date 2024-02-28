


import fs from 'fs';      //new syntaxis
import crypto from "crypto"



class OrderManager {
  static #orders = []
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        OrderManager.#orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    //OrderManager.#orders = [];
    this.init();
  }
  async create(data) {
    try { 
      if (!data.pid) {
        throw new Error("pid is required");
      }

      const order = {
        id: crypto.randomBytes(12).toString("hex"),
        pid: data.pid,
        uid: data.uid,
        quantity: data.quantity,
        state: data.state,
      };
      OrderManager.#orders.push(order);
      const jsonData = JSON.stringify(OrderManager.#orders, null, 2);

      await fs.promises.writeFile(this.path, jsonData); //all poner await, debo poner async a la funcion donde esta esta instruccion
      console.log(order.id);
      return order.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  read() {
    try {
      if (OrderManager.#orders.length === 0) {
        throw new Error("The are no orders!");
      } else {
        console.log(OrderManager.#orders);
        return OrderManager.#orders;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      const one = OrderManager.#orders.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any order");
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
      const one = OrderManager.#orders.find((each)=> each.id === id)
      if (one) {
        OrderManager.#orders = OrderManager.#orders.filter(
          (each)=>each.id !== one.id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrderManager.#orders, null, 2)
        )
        console.log("Destroy ID: "+id);
        return one;
      } else {
        throw new Error("there is no order");
      }

    } catch (error){
      console.log(error.message);
      return error.message
    }
  }

  async update(id, data) {
    try {
      const orderIndex = OrderManager.#orders.findIndex((order) => order.id === id);

      if (orderIndex === -1) {
        throw new Error("Order not found");
      }

      const updatedOrder = {
        ...OrderManager.#orders[orderIndex],
        ...data,
        id: OrderManager.#orders[orderIndex].id, // Mantener el mismo ID
      };

      OrderManager.#orders[orderIndex] = updatedOrder;

      await fs.promises.writeFile(this.path, JSON.stringify(OrderManager.#orders, null, 2));

      console.log("Order updated successfully");
      return updatedOrder;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }



}

const orders = new OrderManager("./src/data/fs/files/orders.Fs.json");
export default orders

//console.log(orders.read());

/*
orders.create({
  pid: "p1111",
  uid: "u1111",
  quantity: 5,
  state: "encargado",
});
orders.create({
  pid: "p2222",
  uid: "u2222",
  quantity: 8,
  state: "vendido",
});
orders.create({
  pid: "p3333",
  uid: "u3333",
  quantity: 2,
  state: "reservado",
});
*/


//console.log(products.read());
//console.log(products.readOne("2464fa95246cbd5050e3a466"));
//await products.read();
//await products.readOne("4a9d62ebb7c4ac575cede2ab");
//await products.destroy("4a9d62ebb7c4ac575cede2ab");
//await products.readOne("4a9d62ebb7c4ac575cede2ab");

//console.log(products.destroy("8f2f1521de5e417e989f98cf"));
