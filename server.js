import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";

//routers
import taskRouter from "./routes/taskRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import cookieParser from "cookie-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/daysTracker/users", authenticateUser, userRouter);
app.use("/api/v1/daysTracker/tasks", authenticateUser, taskRouter);
app.use("/api/v1/daysTracker/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//NOT FOUND MIDDLEWARE
app.use("*", (request, response) => {
  response.status(404).json({ msg: "not found" });
});

//ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
} catch (error) {
  console.log("error::: ", error);
  process.exit(1);
}
