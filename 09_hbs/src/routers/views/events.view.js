import { Router } from "express"
import events from "../../data/fs/events.fs.js"


const eventsRouter = Router()

eventsRouter.get("/", async(req,res,next) => {
  try {
    const all = await events.readEvents()   //acá en el futuro voy a hacer q consulte un servicio
    return res.render("events", { events:all } )
  } catch (error) {
    next(error)
  }

})

eventsRouter.get("/new", async (req,res,next)=>{
  try {
    return res.render("new")
  } catch (error) {
    next(error)
    
  }

})

/*
eventsRouter.get("/", (req, res, next) => {
  try {
    const mainEvents = ["hp", "pokemon", "batman"];
    const date = new Date();
    return res.render("index", { events: mainEvents, date });
  } catch (error) {
    next(error);
  }
});
*/


export default eventsRouter
