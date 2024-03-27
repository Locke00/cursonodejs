import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  report,
  update,
  destroy,
} from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM"], create);
    this.read("/bills/:uid", ["ADMIN"], report);
    this.read("/", ["USER", "PREM"], read);
    this.update("/:oid", ["USER", "PREM"], update);
    this.destroy("/:oid", ["USER", "PREM"], destroy);
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();





/*router.get("/:uid", async(req, res, next)=>{
  try {
    const { uid } = req.params
    const filter = { user_id: uid }
    const all = await orders.read({ filter })
    return res.json({
      statusCode: 200,
      response: all
    })
  } catch (error) {
    throw error
  }

})




router.get("/:oid", async(req, res, next) => {
  try {
    const { oid } = req.params
    const one = await orders.readOne(oid)
    return res.json({
      statusCode: 200,
      response: one
    })
  } catch (error) {
    return next(error)
  }

})  */
