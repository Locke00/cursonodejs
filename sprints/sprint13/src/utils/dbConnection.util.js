import { connect } from "mongoose";
import "dotenv/config.js";
import winstonLog from "../utils/logger/index.js";


export default async function dbConnection() {
  try {
    await connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winstonLog.INFO('Conexión a MongoDB exitosa'))
    .catch(err => winstonLog.FATAL('Error al conectar a MongoDB', err.message));
  } catch (error) {
    winstonLog.FATAL(error.message);
  }
}
