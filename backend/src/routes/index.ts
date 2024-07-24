import { Router } from "express";
import authRoutes from "./auth";
import productRouter from "./product";
import addressRouter from "./address";
import userRouter from "./user";
import cartRouter from "./cart";
import orderRouter from "./order";
import adminRouter from "./admin";

const routeRouter: Router = Router();

routeRouter.use("/auth", authRoutes);

routeRouter.use("/product", productRouter);

routeRouter.use("/user", userRouter);

routeRouter.use("/address", addressRouter);

routeRouter.use("/cart", cartRouter);

routeRouter.use("/order", orderRouter);

routeRouter.use("/admin", adminRouter);

export default routeRouter;
