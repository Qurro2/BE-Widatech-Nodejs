import express from "express";
import userController from "../controller/user-controller.js";
import productController from "../controller/product-controller.js";
import fileUploadMiddleware from "../middleware/file-middleware.js";

const publicRoute = express.Router();

publicRoute.post("/register", fileUploadMiddleware, userController.register);
publicRoute.post("/login", userController.login);
publicRoute.get("/products", productController.getProduct);
publicRoute.get("/products/user", productController.getProduct);

export { publicRoute };
