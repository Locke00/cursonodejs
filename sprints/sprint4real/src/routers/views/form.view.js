import { Router } from "express";

const formRouter = Router();

formRouter.get("/", (req, res, next) => {
  try {
    return res.render("/form", { title: "Formulario" });
  } catch (error) {
    console.log("x aqui paso -catch");
    next(error);
  }
});

export default formRouter;
