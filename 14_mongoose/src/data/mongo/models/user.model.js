import { model, Schema } from "mongoose"  //Schema es el contructor de esquemas

const collection = "users"
const schema = new Schema({      // el id no lo necesito definir ya q se pone automaticamente. el primer elemento de schema son las propiedades
  name: { type: String, required: true },
  last_name: { type: String },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  photo: {type: String, default:"https://i.postimg.cc/wTgNFWhR/prifile.png"},
  age: { type: Number, default: 18},
  //date: {type: Date, default: newDate()}

  },{ timestamps: true }
);

const User = model(collection,schema);       // User debe estar en PascalCase, igual q los componentes de react
export default User;