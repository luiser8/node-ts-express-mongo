import { Router } from "express";
import { getAll, getById, post, put, login, del } from "../controllers/userController";
import { auth } from "../middleware/auth";

const userRouter = Router();

userRouter.get("/", auth, getAll);
userRouter.get("/:id", auth, getById);
userRouter.post("/", auth, post);
userRouter.put("/:id", auth, put);
userRouter.post("/login", login);
userRouter.delete("/:id", auth, del);

export default userRouter;
