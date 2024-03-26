import { connect } from "mongoose";

export default async function dbConnection() {
  try {
    connect(process.env.DB_LINK);
    console.log("database connected");
  } catch (error) {}
}
