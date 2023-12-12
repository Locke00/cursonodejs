console.log("hola mundo");
console.error("este es un error")

const data = { name: "jose", age: 41 }    //   definimos una variable data, va a tener la propiedad name
console.log(data);  // mostrará: { name: 'jose', age: 41 }

data.city = "san miguel de tucuman"       // esto lo puedo hacer xq no esta mutando el objeto
console.log(data);    // mostrará { name: 'jose', age: 41, city: 'san miguel de tucuman' }



//const lastName = "jorge"
//lastName = 'luis'        // esto no lo puedo hacer xq aqui si estoy redefiniendo la variable. daria error

