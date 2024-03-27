import { Router } from "express";

const formRouter = Router();

formRouter.get("/", (req, res, next) => {
  try {
    const user = res.locals.user
    console.log(user);
    if (!user) {
      return res.redirect("/");
    }


    return res.render("form", { title: "Formulario" });
  } catch (error) {
    console.log("x aqui paso -catch");
    next(error);
  }
});

export default formRouter;
