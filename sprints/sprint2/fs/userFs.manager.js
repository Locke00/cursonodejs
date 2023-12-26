const fs = require("fs");
const crypto = require("crypto");

//const ruta = "./sprints/sprint2/fs/data/users.Fs.json";
//const configuracion = "utf-8";
//let usersArray,nextId,usersFs,user

class UserManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }
  async create(data) {
    try {
      if (!data.name) {
        throw new Error("title is required");
      }
      //      nextId = productsArray.length+1
      //nextId = 1;

      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };

      this.users.push(user);
      const jsonData = JSON.stringify(this.users, null, 2);

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
      if (this.users.length === 0) {
        throw new Error("The are no users!");
      } else {
        console.log(this.users);
        return this.users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any user");
      } else {
        //console.log(one);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const users = new UserManager("./sprints/sprint2/fs/data/users.Fs.json");

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
