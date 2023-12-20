const fs = require("fs");

const ruta = "./sprints/sprint2/fs/data/users.Fs.json";
const configuracion = "utf-8";
let usersArray,nextId,usersFs,user


class UserManager {
  constructor() {}

  create(data) {
    fs.promises
      .readFile(ruta,configuracion)
      .then((usersFs)=>{
        usersArray = JSON.parse(usersFs)
        nextId = usersArray.length+1

        const user = {
          id: nextId,
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        usersArray.push(user);
        usersFs = JSON.stringify(usersArray,1,2)
        fs.promises.writeFile(ruta,usersFs)
          .then(res=>console.log('se escribio bien'))
          .catch(error=>console.log('ocurrio un error'))
      })
      .catch((error)=> console.log(error));

  }
  read() {
    fs.promises
      .readFile(ruta,configuracion)
      .then((usersFs)=>{
        usersArray = JSON.parse(usersFs)
        console.log(usersArray);
      })
  }
  readOne(id) {
    fs.promises
    .readFile(ruta,configuracion)
    .then((usersFs)=>{
      usersArray = JSON.parse(usersFs)
      user = usersArray.find((each) => each.id === Number(id));
      console.log(user);
    })

  }
}

const users = new UserManager();

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
console.log('Output of users.readOne(2):  ');
console.log(users.readOne(2));
