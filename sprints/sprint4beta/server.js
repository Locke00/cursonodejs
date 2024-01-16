import express from "express";
import products from "./fs/productFs.manager.js"; //no olvidar aqui poner la extension .js
import users from "./fs/userFs.manager.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

//endpoints: products
//endpoint: GET /api/products
server.get("/api/products", async (req, res) => {
  try {
    const all = await products.read();
    if (Array.isArray(all)) {
      return res.status(200).json({
        success: true,
        response: all,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//endpoint: GET /api/products/:pid
server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.status(200).json(one);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//endpoints: users
//endpoint: GET /api/users
server.get("/api/users", async (req, res) => {
  try {
    const all = await users.read();
    if (Array.isArray(all)) {
      return res.status(200).json({
        success: true,
        response: all,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//endpoint: GET /api/users/:uid
server.get("/api/users/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await users.readOne(pid);
    return res.status(200).json(one);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
