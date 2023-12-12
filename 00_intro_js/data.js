

const myName = "jose"
let age = 22
const price = 100
const list = ["origin", "robocop", "superman", "batman"]

console.log(myName);  // muestra: jose
console.log(age);     // muestra: 22
console.log(price);   // muestra: 100
console.log(list);    // muestra: [ 'origin', 'robocop', 'superman', 'batman' ]


//age = age + 1
age++
console.log(age);     // muestra: 23


//puedo hacer esto xq no voy a modificar la variable, sino q la voy a mutar:
list.push('interestelar')
console.log(list);    // muestra: [ 'origin', 'robocop', 'superman', 'batman', 'interestelar' ]
