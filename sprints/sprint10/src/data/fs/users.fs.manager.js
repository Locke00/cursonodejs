import fs from "fs";
import crypto from "crypto";

//const ruta = "./sprints/sprint2/fs/data/users.fs.json";
//const configuracion = "utf-8";
//let usersArray,nextId,usersfs,user

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
      return error;
    }
  }

  constructor(path) {
    this.path = path;
    this.users  = []
    this.init();
  }
  async create(data) {
    //console.log('2222');
    try {
      if (!data.name) {
        throw new Error("user is required");
      }
      //      nextId = usersArray.length+1
      //nextId = 1;

      /*const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };*/

      this.users.push(data);
      const jsonData = JSON.stringify(this.users, null, 2);

      await fs.promises.writeFile(this.path, jsonData); //all poner await, debo poner async a la funcion donde esta esta instruccion
      //console.log(user.id);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  read({ filter, options }) {
    //este metodo para ser compatible con las otras persistencias
    //necesita agregar los filtros
    //y la paginacion/orden
    try {
      if (this.users.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404
        throw error
      } else {
        return this.users;
      }
    } catch (error) {
      return error;
    }
  }
  readOne(id) {
    try {
      console.log(id);
      const one = this.users.find((each) => each._id === id);
      if (!one) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404
        throw error
      } else {
        //console.log(one);
        return one;
      }
    } catch (error) {
      return error;
    }
  }

  readByEmail(email) {
    try {
      const one = this.users.find((each) => each.email === email);
      if (!one) {
        return null;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    ///console.log(this.users);
    
    try {
      
      const userIndex = this.users.findIndex((user) => user._id === id);

      if (userIndex === -1) {
        throw new Error("User not found");
      }
      
      const updatedUser = {
        ...this.users[userIndex],
        ...data,
        _id: this.users[userIndex]._id, // Mantener el mismo ID
      };

      console.log(updatedUser);
      

      this.users[userIndex] = updatedUser;

      await fs.promises.writeFile(this.path, JSON.stringify(this.users, null, 2));

      console.log("User updated successfully");
      return updatedUser;
    } catch (error) {
      //console.log(error);
      return error;
    }
  }    //updated alternativo
  
  /*async update(uid, data) {
    try {
      const one = this.readOne(uid);
      notFoundOne(one)
      for (let each in data) {
        one[each] = data[each]
      }
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }*/
  

  async destroy(id) {
    try {
      const one = this.users.find((each)=> each._id === id)
      if (one) {
        this.users = this.users.filter(
          (each)=>each._id !== one._id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.users, null, 2)
        )
        console.log("Destroy ID: "+id);
        return one;
      } else {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404
        throw error

      }

    } catch (error){
      console.log(error);
      return error
    }
  }

  /*  //forma alternativa de destroy
async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one)
      this.users = this.users.filter((each) => each._id !== id);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }
*/


}

const users = new UserManager("./src/data/fs/files/users.fs.json");
export default users;
//console.log(users.read());

//await users.readOne("7855492351fe9b5fcd5ba2c6");
//await users.destroy("7855492351fe9b5fcd5ba2c6");
//await users.readOne("7855492351fe9b5fcd5ba2c6");


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
