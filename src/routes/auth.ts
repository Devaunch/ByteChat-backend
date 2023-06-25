import { Router } from "express";
import { Register, Login } from "../controllers/auth";
import passport from "passport";

const authRouter = Router();

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({ success: false, msg: "Not authenticated" });
});
authRouter.get("/logout", (req, res) => {
  req.logout((e) => {
    console.log(e);
  });
  res.redirect("http://localhost:5173");
});

authRouter.get("/login/success", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email", "age"] })
);

authRouter.get("/", (req, res) => {
  res.send("welcome to the auth page");
});

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
