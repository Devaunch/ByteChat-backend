import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import USER from '../model/User';
import { createError } from '../utils/createError';

export const verifyToken: RequestHandler = async (req, res, next) => {
   try {
      if (req.user) next();
      if (req.cookies.jwt) {
         const token = req.cookies.jwt;
         const userId = jwt.verify(token, config.keys.jwt);
         const user = await USER.findOne({ _id: userId });
         if (user) {
            req.user = user;
         } else {
            next(createError('Authentication failed', 401));
         }
      }
   } catch (err) {
      next(err);
   }
};
