import fs from "fs";
import crypto from "crypto";

//const ruta = "./sprints/sprint2/fs/data/users.Fs.json";
//const configuracion = "utf-8";
//let usersArray,nextId,usersFs,user

class UserManager {
  static #users = []
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        UserManager.#users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    //UserManager.#users = [];
    this.init();
  }
  async create(data) {
    try {
      if (!data.name) {
        throw new Error("title is required");
      }
      //      nextId = usersArray.length+1
      //nextId = 1;

      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };

      UserManager.#users.push(user);
      const jsonData = JSON.stringify(UserManager.#users, null, 2);

      await fs.promises.writeFile(this.path, jsonData); //all poner await, debo poner async a la funcion donde esta esta instruccion
      console.log(user.id);
      return user.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("The are no users!");
      } else {
        console.log(UserManager.#users);
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any user");
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
      const one = UserManager.#users.find((each)=> each.id === id)
      if (one) {
        UserManager.#users = UserManager.#users.filter(
          (each)=>each.id !== one.id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        )
        console.log("Destroy ID: "+id);
        return one;
      } else {
        throw new Error("there is no user");
      }

    } catch (error){
      console.log(error.message);
      return error.message
    }
  }

}

const users = new UserManager("./fs/data/users.Fs.json");
export default users;
//console.log(users.read());

await users.readOne("7855492351fe9b5fcd5ba2c6");
await users.destroy("7855492351fe9b5fcd5ba2c6");
await users.readOne("7855492351fe9b5fcd5ba2c6");


//console.log(users.read());

/*
users.create({
  name: "Juan",
  photo: "http://www.casa.com/juan.jpg",
  email: "juan@gmail.com",
});
users.create({
  name: "Pedro",
  photo: "http://www.casa.com/pedro.jpg",
  email: "pedro@gmail.com",
});
users.create({
  name: "Lucas",
  photo: "http://www.casa.com/lucas.jpg",
  email: "lucas@gmail.com",
});

console.log('Output of users.read():  ');
console.log(users.read());
console.log('Output of users.readOne(2854b8cadedcce4e653d5375):  ');
console.log(users.readOne("2854b8cadedcce4e653d5375"));
*/
