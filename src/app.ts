import * as dotenv from "dotenv";
dotenv.config();
import createError from "http-errors";
import express, { Response, Request, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";

import noteRouter from "./routes/note";
import usersRouter from "./routes/users";
import homePage from "./routes/page";

// console.log(process.env);

const app = express();
// const MONGO_PASSWORD = process?.env?.MONGO_PASSWORD as string;

// const MONGO_URL = process.env.DATABASE_URL as string;
// const DB = MONGO_URL.replace("<PASSWORD>", MONGO_PASSWORD);
const DB = process.env.MONGO_URI as string;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Server Connected to MongoDB");
    // startServer();
  })
  .catch((error) => {
    console.log(error);
  });

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/note", noteRouter);
app.use("/users", usersRouter);
app.use("/", homePage);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
