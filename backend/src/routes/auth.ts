import { Router } from "express";
import { login, logout, me, signup } from "../controllers/auth";
import { errorHandler } from "../errorHandler";
import { authMiddleware } from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signup));

authRoutes.post("/login", errorHandler(login));

authRoutes.get("/me", [authMiddleware], errorHandler(me));

authRoutes.post("/logout", errorHandler(logout));

export default authRoutes;
