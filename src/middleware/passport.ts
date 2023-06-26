import passport from "passport";
import { Strategy as GoogleLogin } from "passport-google-oauth20";
import USER from "../model/User";
passport.use(
  new GoogleLogin(
    {
      clientID: process.env.GOOGLE_CLIENT || "your_google_client_id",
      clientSecret: process.env.GOOGLE_SECRET || "your_google_secret",
      callbackURL: "/api/auth/google/callback",
    },
    async function (accToken, refreshToken, profile, done) {
      const { displayName, emails, photos } = profile;
      if (!emails || !photos) throw new Error("couldnt authenticate properly");
      const dbUser = await USER.find({ email: emails[0].value });
      if (dbUser) return done(null, dbUser);
      const User = new USER({
        name: displayName,
        email: emails[0].value,
        avatarImg: photos[0].value,
        oAuth: true,
      });
      const savedUser = await User.save();
      done(null, savedUser);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (user) {
    done(null, user);
  }
});
