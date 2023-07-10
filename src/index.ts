import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
<<<<<<< HEAD
import session from 'express-session';
=======
import cookieParser from 'cookie-parser';
>>>>>>> 6ac67bb16fe2c69187517591f7dec0325ddf64f8
import cookieSession from 'cookie-session';
import passport from 'passport';
import { connect } from 'mongoose';
import authRouter from './routes/auth';
<<<<<<< HEAD
import questionsRouter from './routes/questions';
=======
import userRouter from './routes/user';
>>>>>>> 6ac67bb16fe2c69187517591f7dec0325ddf64f8
import { ErrorType } from './utils/types';
import './middleware/passport';
import config from './config';

//import constants
const app = express();
const PORT = config.server.port;

connect(config.db.default)
<<<<<<< HEAD
    .then(() => {
        console.log('Connected to db');
        startServer();
    })
    .catch((err) => {
        console.log(`Couldn't connect to db due to: \n ${err}`);
    });

const startServer = () => {
    //essential middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(
        cors({
            origin: 'http://localhost:3000',
            methods: 'PUT,POST,GET,DELETE',
            credentials: true
        })
    );

    app.use(
        cookieSession({
            name: 'session',
            keys: [config.keys.session],
            maxAge: 24 * 60 * 60 * 1000
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    //routers
    app.use('/api/auth', authRouter);
    app.use('/api/questions', questionsRouter);

    //catching errors
    app.use((err: ErrorType, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message;
        return res.status(status).json({
            sucess: false,
            status,
            message
        });
    });

    //listening to the server
    app.listen(PORT, () => {
        console.log(`Listening at port: ${PORT}`);
    });
=======
   .then(() => {
      console.log('Connected to db');
      startServer();
   })
   .catch((err) => {
      console.log(`Couldn't connect to db due to: \n ${err}`);
   });

const startServer = () => {
   //essential middleware
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));
   app.use(cookieParser());
   app.use(
      cors({
         origin: 'http://localhost:3000',
         methods: 'PUT,POST,GET,DELETE',
         credentials: true
      })
   );

   app.use(
      cookieSession({
         name: 'session',
         keys: [config.keys.session],
         maxAge: 24 * 60 * 60 * 1000
      })
   );
   app.use(passport.initialize());
   app.use(passport.session());

   //routers
   app.use('/api/auth', authRouter);
   app.use('/api/users', userRouter);

   //catching errors
   app.use((err: ErrorType, req: Request, res: Response, next: NextFunction) => {
      const status = err.status || 500;
      const message = err.message;
      return res.status(status).json({
         sucess: false,
         status,
         message
      });
   });

   //listening to the server
   app.listen(PORT, () => {
      console.log(`Listening at port: ${PORT}`);
   });
>>>>>>> 6ac67bb16fe2c69187517591f7dec0325ddf64f8
};
