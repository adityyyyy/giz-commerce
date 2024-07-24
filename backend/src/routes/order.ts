import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/order";

const orderRouter: Router = Router();

orderRouter.post("/create", [authMiddleware], errorHandler(createOrder));

orderRouter.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));

orderRouter.get("/", [authMiddleware], errorHandler(getAllOrders));

orderRouter.get("/:id", [authMiddleware], errorHandler(getOrderById));

export default orderRouter;
