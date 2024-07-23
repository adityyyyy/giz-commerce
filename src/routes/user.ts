import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import { getAllUsers, getUserById, updateUser } from "../controllers/user";

const userRouter: Router = Router();

userRouter.put("/update", [authMiddleware], errorHandler(updateUser));

userRouter.get("/all", [authMiddleware], errorHandler(getAllUsers));

userRouter.get("/:id", [authMiddleware], errorHandler(getUserById));

export default userRouter;
