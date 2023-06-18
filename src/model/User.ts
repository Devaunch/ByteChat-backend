import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface UserType {
  name: string;
  email: string;
  age: number;
  languages: string[];
  avatarImg: string;
  followers: string[];
  following: string[];
  friends: string[];
  badges: string[];
  address: string;
  mobile: number;
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
    email: stringType,
    age: {
      type: Number,
      required: true,
    },
    languages: arrayType,
    avatarImg: stringType,
    followers: arrayType,
    following: arrayType,
    friends: arrayType,
    address: stringType,
    mobile: {
      type: Number,
      required: true,
    },
    password: String,
    oAuth: {
      type: Boolean,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    badges: arrayType,
    tokens: [
      {
        token: {
          type: String,
          required: true,
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
      process.env.JWT_KEY || "yoursecretkey"
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
