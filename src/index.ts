import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import cookieSession from "cookie-session";
import passport from "passport";
import { connect } from "mongoose";
import authRouter from "./routes/auth";
import { ErrorType } from "./utils/types";
import './middleware/passport'

//import constants
const app = express();
const PORT = process.env.PORT;

connect(process.env.MONGO_URL || "mognodb://127.0.0.1/sociomedia")
  .then(() => {
    console.log("Connected to db");
    startServer();
  })
  .catch((err) => {
    console.log(`Couldn't connect to db due to: \n ${err}`);
  });

const startServer = () => {
  //essential middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors({
    origin:"http://localhost:3000",
    methods:"PUT,POST,GET,DELETE",
    credentials:true,
  }));

  app.use(cookieSession({
    name: "session",
    keys: ["kartikey"],
    maxAge: 24 * 60 * 60 * 1000,
  }))
  app.use(passport.initialize());
  app.use(passport.session());

  //routers
  app.use("/api/auth", authRouter);

  //catching errors
  app.use((err: ErrorType, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
      sucess: false,
      status,
      message,
    });
  });

  //listening to the server
  app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
  });
};
