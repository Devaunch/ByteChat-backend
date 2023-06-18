import { RequestHandler } from "express";
import USER from "../model/User";
import { createError } from "../utils/createError";
import { CookieType } from "../utils/types";
export const Register: RequestHandler = async (req, res, next) => {
  const {
    name,
    email,
    password,
    age,
    languages,
    avatarImg,
    address,
    mobile,
    gender,
    DOB,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !age ||
    !languages ||
    !address ||
    !mobile ||
    !gender ||
    !DOB
  ) {
    next(createError("Please provide all the fields", 402));
  }
  try {
    const emailExists = await USER.find({ email });
    const numberExists = await USER.find({ mobile });

    if (emailExists.length !== 0 || numberExists.length !== 0) {
      next(
        createError("You already have an account, Please login to proceed", 402)
      );
    }

    const user = new USER({
      name,
      email,
      age,
      password,
      languages,
      address,
      mobile,
      gender,
      DOB,
      avatarImg: avatarImg || "none",
      oAuth: false,
    });
    const result = await user.save();
    const token = await user.generateAuthToken();
    const cookieOps: CookieType = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    if (process.env.DEV_ENV === "production") cookieOps.secure = true;
    if (result) {
      res.cookie("jwt", token, cookieOps).status(201).json({
        success: true,
        message: "You were registered successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};
