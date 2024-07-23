import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import {
  addCartItem,
  changeCartItemQuantity,
  deleteCartItem,
  getAllCartItems,
} from "../controllers/cart";

const cartRouter: Router = Router();

cartRouter.post("/", [authMiddleware], errorHandler(addCartItem));

cartRouter.put("/:id", [authMiddleware], errorHandler(changeCartItemQuantity));

cartRouter.delete("/:id", [authMiddleware], errorHandler(deleteCartItem));

cartRouter.get("/", [authMiddleware], errorHandler(getAllCartItems));

export default cartRouter;
