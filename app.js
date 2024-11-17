import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleWare } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import timelineRouter from "./router/timelineRouter.js";
import softwareApplicationRouter from "./router/softwareApplicationRouter.js";
import skillRouter from "./router/skillRouter.js";
import projectRouter from "./router/projectRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.PORTFOLIO_URL,
        process.env.DASHBOARD_URL,
      ];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareApplication", softwareApplicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();
app.use(errorMiddleWare);
export default app;
