import { Router } from "express";

import { orders, users } from "../../data/mongo/manager.mongo.js";

//import passCallBack from "../../middlewares/passCallBack.mid.js";

const orderRouter = Router();

orderRouter.get("/", async (req, res, next) => {
  try {
    
    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };
    console.log("intento-start");
    //console.log(req.body);
    //console.log(req.user.email);
    
    const token = req.cookies.token
    console.log('token jwt: ', token);
    
    const user_id = '65f3b1e3d109c763063c7f60';
    //const user = await users.readByEmail(req.user.email);
    console.log("intento-end");
    const filter = {
      //user_id: user._id,
      user_id: user_id,
    };
    const allBSON = await orders.read({ filter, options });
    const allBSONstr = JSON.stringify(allBSON);
    const all = JSON.parse(allBSONstr);  //queda el objeto en formato json

    //console.log(all.docs[0].product_id);
    console.log(all);
    return res.render("orders", { title: "MY CART", orders: all.docs });
  } catch (error) {
    return res.render("orders", {
      title: "MY CART",
      message: "NO ORDERS YET!",
    });
  }
});

export default orderRouter;
