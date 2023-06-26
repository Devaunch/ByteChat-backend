import { Router } from "express";
import { Register, Login, Check } from "../controllers/auth";
import passport from "passport";

const authRouter = Router();

authRouter.get("/check", Check)

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({ success: false, msg: "Not authenticated" });
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  })
);
authRouter.post("/register", Register);
authRouter.post("/login", Login);

export default authRouter;
