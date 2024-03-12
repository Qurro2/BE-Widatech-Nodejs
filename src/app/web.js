import express from "express";
import cors from "cors";
import { userRouter } from "../routes/user-routes.js";
import { publicRoute } from "../routes/public-routes.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();

web.use(express.json());
web.use(cors());
web.use(express.static("public/images"));
web.use(publicRoute);
web.use(userRouter);
web.use(errorMiddleware);
