class OrderManager {
  static #orders = [];
  constructor() {}
  create(data) {
    const order = {
      id:
        OrderManager.#orders.length === 0
          ? 1
          : OrderManager.#orders[OrderManager.#orders.length - 1].id + 1,
      pid: data.pid,
      uid: data.uid,
      quantity: data.quantity,
      state: data.state,
    };
    OrderManager.#orders.push(order);
  }
  read() {
    return OrderManager.#orders;
  }
  readOne(id) {
    return OrderManager.#orders.find((each) => each.id === Number(id));
  }
  destroy(id) {
    try {
      const one = OrderManager.#orders.find((each) => each.id == id);
      if (one) {
        OrderManager.#orders = OrderManager.#orders.filter(
          (each) => each.id !== id
        );
        console.log("Destroyed ID:" + id);
        return id;
      } else {
        throw new Error("there isnt product with ID" + id);
      }
    } catch (error) {}
    console.log(error.message);
    return error.message;
  }

  update(id, data) {
    try {
      const index = OrderManager.#orders.findIndex((order) => order.id === id);

      if (index === -1) {
        throw new Error(`Order with ID ${id} not found`);
      }

      OrderManager.#orders[index] = {
        ...OrderManager.#orders[index],
        ...data,
      };

      console.log(`Order with ID ${id} updated successfully`);
      return OrderManager.#orders[index];
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
}

const orders = new OrderManager();

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

console.log(orders.read());


//console.log("Output of products.read():  ");
//console.log(products.destroy(2));
//console.log(products.read());
//console.log('Output of products.readOne(2):  ');
//console.log(products.readOne(2));
