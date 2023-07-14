import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import USER from '../model/User';
import { createError } from '../utils/createError';

export const verifyToken: RequestHandler = async (req, res, next) => {
    try {
        if (req.user) next();

        const token = req.cookies.jwt || req.headers?.authorization?.split(' ')[1];
        if (token) {
            const userId = jwt.verify(token, config.keys.jwt);
            const user = await USER.findOne({ _id: userId });
            if (user) {
                req.user = user;
                next();
            } else {
                next(createError('Authentication failed', 401));
            }
        } else {
            next(createError('Not authenticated', 402));
        }
    } catch (err) {
        next(err);
    }
};
