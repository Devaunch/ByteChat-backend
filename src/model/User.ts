import { Schema, model, ObjectId } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

export interface UserType {
  _id:ObjectId,
  name: string;
  email: string;
  age: number;
  languages: string[];
  avatarImg: string;
  followers: string[];
  following: string[];
  friends: string[];
  badges: string[];
  gender: string;
  DOB: Date;
  password: string;
  oAuth: boolean;
  tokens: [
    {
      token: string;
    }
  ];
  generateAuthToken():Promise<string>
}

const stringType = {
  type: String,
  required: true,
};

const arrayType = {
  type: [String],
  default: [],
};

const userSchema = new Schema<UserType>(
  {
    name: stringType,
    email: {...stringType, unique:true},
    age: Number,
    languages: arrayType,
    avatarImg: stringType,
    followers: arrayType,
    following: arrayType,
    friends: arrayType,
    password: String,
    oAuth: {
      type: Boolean,
      required: true,
    },
    gender:String,
    DOB: Date,
    badges: arrayType,
    tokens: [
      {
        token: {
          type: String
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function (): Promise<string> {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      config.keys.jwt
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    return `${error}`;
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 4);
  next();
});
const USER = model<UserType>("user", userSchema);

export default USER;
