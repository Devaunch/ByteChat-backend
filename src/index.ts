import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "express-session";
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
    methods:"PUT,PULL,POST,GET,DELETE,OPTIONS",
    credentials:true,
  }));
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
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
