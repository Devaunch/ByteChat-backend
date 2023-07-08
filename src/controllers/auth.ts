import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import USER from '../model/User';
import { createError } from '../utils/createError';
import config from '../config';

export const Register: RequestHandler = async (req, res, next) => {
   const { name, email, password, avatarImg } = req.body;
   console.log(req.body);
   if (!name || !email || !password) {
      return next(createError('Please provide all the necessary fields', 402));
   }
   try {
      const emailExists = await USER.find({ email });

      if (emailExists.length !== 0) {
         return next(createError('You already have an account, Please login to proceed', 402));
      }

      const user = new USER({
         name,
         email,
         password,
         avatarImg: avatarImg || 'none',
         oAuth: false
      });
      const result = await user.save();
      const token = await user.generateAuthToken();
      console.log(token);
      if (result) {
         res.cookie('jwt', token).status(201).json({
            success: true,
            status: 201,
            message: 'You were registered successfully',
            token
         });
      }
   } catch (err) {
      next(err);
   }
};

export const Login: RequestHandler = async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) {
      next(createError('Please fill out all the fields', 402));
   }
   try {
      const user = await USER.findOne({ email });
      if (!user) return next(createError('Invalid EMAIL or password', 402));

      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) return next(createError('Invalid email or PASSWORD', 402));

      const token = await user.generateAuthToken();
      res.cookie('jwt', token).status(200).json({
         success: true,
         status: 200,
         message: 'You were logged in successfully',
         token,
         user
      });
   } catch (err) {
      next(err);
   }
};

export const Check: RequestHandler = async (req, res, next) => {
   try {
      if (req.user) {
         return res.status(200).json({
            success: true,
            loggedIn: true,
            cookies: req.cookies,
            user: req.user
         });
      }
      const token = req.headers.authorization?.split(' ')[1];
      // const token = req.cookies.jwt;
      if (token && token !== 'null') {
         const userId = jwt.verify(token, config.keys.jwt);
         const user = await USER.findById(userId);
         return res.status(200).json({
            success: true,
            loggedIn: true,
            user
         });
      }
      return res.status(200).json({
         success: true,
         loggedIn: false,
         user: null
      });
   } catch (err) {
      next(err);
   }
};
