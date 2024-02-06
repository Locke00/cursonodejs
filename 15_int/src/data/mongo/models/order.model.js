import { model, Schema, Types } from "mongoose"

const collection = "orders"
const schema = new Schema({
  user_id: { type: Types.ObjectId, required: true, ref: "users" },
  event_id: { type: Types.ObjectId, required: true, ref: "events" },
  //las propiedades q necesiten referenciarse o relacionarse con otros modelos
    //de otras colecciones deben configurarse como de tipo ObjectId
    //y con el atributo ref, para referenciar hacia "tal coleccion"
    //en ref va el nombre de la coleccion q se quiere referenciar
  quantity: { type: Number, default: 1 },
  state: { type: String, default: "reserved", enum: ["reserved","payed","delivered"] }
  //el enum permiteponer los unicos strings q se pueden pasar. no permite otros valores
  //se utilizar para validar los datos

  // en state pasa lo mismo q con los roles
    //puede definirlo como nro:
      //0
      //1
      //2
    //o como string
      //reserver
      //payed
      //delivered
},{ timestamps: true })

const Order = model(collection,schema)
export default Order