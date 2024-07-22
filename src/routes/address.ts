import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import {
  addAddress,
  deleteAddress,
  getAllAddresses,
  updateAddress,
} from "../controllers/user";

const addressRouter = Router();

addressRouter.get("/", [authMiddleware], errorHandler(getAllAddresses));

addressRouter.post("/", [authMiddleware], errorHandler(addAddress));

addressRouter.delete("/:id", [authMiddleware], errorHandler(deleteAddress));

addressRouter.put("/:id", [authMiddleware], errorHandler(updateAddress));

export default addressRouter;
