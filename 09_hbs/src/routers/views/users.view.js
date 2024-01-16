import { Router } from "express";

import users from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.use("/profile", (req, res, next) => {
  try {
    const one = users.readOne("3deecf9368f89f23b96d449d");
    console.log(one);
    return res.render("profile", { one });
  } catch (error) {
    throw error;
  }
});

export default usersRouter;
