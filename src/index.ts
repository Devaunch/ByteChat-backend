import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "mongoose";
import authRouter from "./routes/auth";
import { ErrorType } from "./utils/types";

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
  app.use(cors());

  //routers
  app.use("/api/auth", authRouter);

  //catching errors
  app.use((err: ErrorType, req: Request, res: Response) => {
    const status = err.status;
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
