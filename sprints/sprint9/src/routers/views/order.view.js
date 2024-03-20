import { Router } from "express";
import { verifytoken } from "../../utils/token.util.js";


import { orders, users } from "../../data/mongo/manager.mongo.js";

//import passCallBack from "../../middlewares/passCallBack.mid.js";

const orderRouter = Router();

orderRouter.get("/", async (req, res, next) => {
  try {
    const user = res.locals.user
    if (!user) {
      return res.redirect("/");
    }
    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };
    const filter = {
      //user_id: user._id,
      user_id: user._id.toString(),
    };
    const allBSON = await orders.read({ filter, options });
    const allBSONstr = JSON.stringify(allBSON);
    const all = JSON.parse(allBSONstr);  //queda el objeto en formato json

    //console.log(all.docs[0].product_id);
    return res.render("orders", { 
      title: "MY CiART",
      orders: all.docs,
    } ) ;
  } catch (error) {
    console.log({error})
    return res.render("orders", {
      title: "MY wCART",
      message: "NO ORDERS YET!",
    });
  }
});

export default orderRouter;
