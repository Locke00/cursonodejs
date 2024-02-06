import { model, Schema } from "mongoose";

const collection = "events";
const schema = new Schema(
  {
    name: { type: String, required: true },
    poster: { 
      type: String, 
      default: "https://i.postimg.cc/wTgNFWhR/profile.png" 
    },
    place: { type: String, default: "Village", enum: ["Hoyts", "Showcase", "Village","Stadium"] },
    price: { type: Number, default: 10 },
    capacity: { type: Number, default: 50 },
    date: { type: Date, default: new Date() }
    // si quisiera usar un array (aunq no se recomienda usar arrays)
    //poster: [{ 
    //  type: String, 
    //  default: "https://eikonos.com/wp-content/webp-express/webp-images/uploads/2019/11/G2J_Eikonos_nov2019_consejos_diseno_para_eventos.jpg.webp" 
    //]},
    




  },
  {
    timestamps: true,
  }
);

const Event = model(collection, schema);
export default Event;
