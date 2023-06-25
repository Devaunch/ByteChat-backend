import passport from "passport";
import { Strategy as GoogleLogin } from "passport-google-oauth20";
import USER from "src/model/User";
passport.use(
  new GoogleLogin(
    {
      clientID: process.env.GOOGLE_CLIENT || "your_google_client_id",
      clientSecret: process.env.GOOGLE_SECRET || "your_google_secret",
      callbackURL: "/api/auth/google/callback",
    },
    async function (accToken, refreshToken, profile, done) {
      const {displayName, emails} = profile
      if(!emails) throw new Error("no email")
      const newUser = new USER({
        name:displayName,
        email:emails[0].value,
      })
      done(null, profile);
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
