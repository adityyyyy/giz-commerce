import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import {
  changeOrderStatus,
  changeUserRole,
  listAllOrders,
} from "../controllers/admin";
import { errorHandler } from "../errorHandler";

const adminRouter: Router = Router();

adminRouter.put(
  "/role/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(changeUserRole),
);

adminRouter.get(
  "/orders",
  [authMiddleware, adminMiddleware],
  errorHandler(listAllOrders),
);

adminRouter.put(
  "/status/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(changeOrderStatus),
);

export default adminRouter;
