import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import USER from "../model/User";
import { createError } from "../utils/createError";
import { CookieType } from "../utils/types";

const cookieOps: CookieType = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};
if (process.env.DEV_ENV === "production") cookieOps.secure = true;

export const Register: RequestHandler = async (req, res, next) => {
  const { name, email, password, avatarImg } = req.body;
  if (!name || !email || !password) {
    return next(createError("Please provide all the necessary fields", 402));
  }
  try {
    const emailExists = await USER.find({ email });

    if (emailExists.length !== 0) {
      return next(
        createError("You already have an account, Please login to proceed", 402)
      );
    }

    const user = new USER({
      name,
      email,
      password,
      avatarImg: avatarImg || "none",
      oAuth: false,
    });
    const result = await user.save();
    const token = await user.generateAuthToken();
    if (result) {
      res.cookie("jwt", token, cookieOps).status(201).json({
        success: true,
        status: 201,
        message: "You were registered successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const Login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(createError("Please fill out all the fields", 402));
  }
  try {
    const user = await USER.findOne({ email });
    if (!user) return next(createError("Invalid EMAIL or password", 402));

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch)
      return next(createError("Invalid email or PASSWORD", 402));

    const token = user.generateAuthToken();
    res.cookie("jwt", token, cookieOps).status(200).json({
      success: true,
      status: 200,
      message: "You were logged in successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const Check: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      return res.status(200).json({
        success:true,
        loggedIn:true,
        cookies:req.cookies,
        user:req.user,
      });
    }
    const token = req.cookies?.jwt;
    if (token) {
      const userId = jwt.verify(token, process.env.JWT_KEY || "your_jwt_key");
      const user = await USER.findById(userId);
      return res.status(200).json({
        success:true,
        loggedIn:true,
        cookies:req.cookies,
        user,
      });
    }
    return res.status(401).json({
      success:true,
      loggedIn:false,
      cookies:req.cookies,
      user:null,
    });
  } catch (err) {
    next(err);
  }
};
