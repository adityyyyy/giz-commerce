import { Router } from "express";
import authRoutes from "./auth";
import productRouter from "./product";
import addressRouter from "./address";

const routeRouter: Router = Router();

routeRouter.use("/auth", authRoutes);

routeRouter.use("/product", productRouter);

routeRouter.use("/address", addressRouter);

export default routeRouter;
