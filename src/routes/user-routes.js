import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import salesController from "../controller/sales-controller.js";
import fileUploadMiddleware from "../middleware/file-middleware.js";
import productController from "../controller/product-controller.js";
import salesDataController from "../controller/sales-data-controller.js";

const userRouter = new express.Router();

userRouter.use(authMiddleware);

userRouter.get("/user/current", userController.get);
userRouter.patch("/user/current/update", userController.update);
userRouter.delete("/logout", userController.logout);

// data faktur
userRouter.get("/user/salesdata", salesController.get);
userRouter.get("/user/salesdata/:dataId", salesController.getById);
userRouter.post("/user/input", salesController.create);
userRouter.patch("/user/salesdata/update/:dataId", salesController.update);
userRouter.delete("/user/salesdata/delete/:dataId", salesController.remove);

// data product
userRouter.get("/user/product", productController.getProduct);
userRouter.get("/user/product/:dataProductId", productController.getById);
userRouter.post(
  "/user/products",
  fileUploadMiddleware,
  productController.create
);

userRouter.patch(
  "/user/products/update/:productId",
  fileUploadMiddleware,
  productController.update
);

userRouter.delete("/user/products/delete/:productId", productController.remove);

//chart

userRouter.get("/dashboard/daily/chart", salesDataController.getDailySales);
userRouter.get("/dashboard/weekly/chart", salesDataController.getWeeklySales);
userRouter.get("/dashboard/monthly/chart", salesDataController.getMonthlySales);
export { userRouter };
