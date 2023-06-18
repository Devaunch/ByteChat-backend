import { Router } from "express";
import { Register } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login");

export default authRouter;
