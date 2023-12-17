class UserManager {
  static users = [];
  constructor() {}

  create(data) {
    const user = {
      id:
        UserManager.users.length === 0
          ? 1
          : UserManager.users[UserManager.users.length - 1].id + 1,

      name: data.name,
      photo: data.photo,
      email: data.email,
    };
    UserManager.users.push(user);
  }
  read() {
    return UserManager.users;
  }
  readOne(id) {
    return UserManager.users.find((each) => each.id === Number(id));
  }
}

const users = new UserManager();

//users.create(1, "Juan", "http://www.casa.com/juan.jpg", "juan@gmail.com");
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
