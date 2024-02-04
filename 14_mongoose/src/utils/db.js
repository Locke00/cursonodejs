import { connect } from "mongoose";

const dbConnection = async () => {   // la funcion es asincrona xq debo esperar el tiempo de conexion, esperar a estar conectado a la DB
  try {
    await connect(process.env.DB_LINK);
    //hoseluisperez:secreto99@mycluster-joseluis.imzufgg.mongodb.net/events-55655
    //await connect("mongodb+srv://hoseluisperez:secreto99@mycluster-joseluis.imzufgg.mongodb.net/");
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
