import { Router } from "express";
import { errorHandler } from "../errorHandler";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProduct,
  searchProduct,
  updateProduct,
} from "../controllers/product";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

const productRouter: Router = Router();

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

productRouter.get("/search", errorHandler(searchProduct));

productRouter.get("/:id", errorHandler(getProductById));

productRouter.get("/", errorHandler(listProduct));

export default productRouter;
