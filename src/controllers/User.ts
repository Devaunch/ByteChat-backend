import { RequestHandler } from 'express';
import { createError } from '../utils/createError';
import USER from '../model/User';
export const Edit: RequestHandler = async (req, res, next) => {
   try {
      const _id = req.user;
      const newUser = await USER.updateOne(
         { _id },
         {
            $set: { ...req.body }
         },
         { new: true }
      );
      if (!newUser) return next(createError("Couldn't find the user", 402));
      return res.status(201).json({
         status: 201,
         success: true,
         user: newUser
      });
   } catch (err) {
      next(err);
   }
};
