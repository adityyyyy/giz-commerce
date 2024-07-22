import { Router } from "express";
import { errorHandler } from "../errorHandler";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProduct,
  updateProduct,
} from "../controllers/product";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const productRouter = Router();

productRouter.post(
  "/create",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct),
);

productRouter.put(
  "/update/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(updateProduct),
);

productRouter.delete(
  "/delete/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteProduct),
);

productRouter.get("/:id", [authMiddleware], errorHandler(getProductById));

productRouter.get("/", [authMiddleware], errorHandler(listProduct));

export default productRouter;
