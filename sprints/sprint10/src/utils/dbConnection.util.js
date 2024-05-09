import { connect } from "mongoose";
import "dotenv/config.js";

export default async function dbConnection() {
  try {
    await connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

    console.log("database connected");
  } catch (error) {
    console.log(error);

  }
}
