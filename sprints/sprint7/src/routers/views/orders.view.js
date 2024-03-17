import { Router } from "express";

import { orders, users } from "../../data/mongo/manager.mongo.js";

//import passCallBack from "../../middlewares/passCallBack.mid.js";

const orderViewRouter = Router();

orderViewRouter.get("/", async (req, res, next) => {
  try {
    
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };
    console.log("intento-start");
    console.log(req);
    //console.log(req.user.email);
    const user = '65f3b1e3d109c763063c7f60';
    //const user = await users.readByEmail(req.user.email);
    console.log("intento-end");
    const filter = {
      user_id: user._id,
    };
    const all = await orders.read({ filter, options });
    console.log(all.docs[0].product_id);
    return res.render("orders", { title: "MY CART", orders: all.docs });
  } catch (error) {
    return res.render("orders", {
      title: "MY CART",
      message: "NO ORDERS YET!",
    });
  }
});

export default orderViewRouter;
