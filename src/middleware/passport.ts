import passport from "passport";
import { Strategy as GoogleLogin } from "passport-google-oauth20";
import { Strategy as GithubLogin } from "passport-github2";
import USER from "../model/User";
import config from "../config"
passport.use(
  new GoogleLogin(
    {
      clientID: config.oAuth.google.id,
      clientSecret: config.oAuth.google.secret,
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

passport.use(
  new GithubLogin(
    {
      clientID: config.oAuth.github.id,
      clientSecret: config.oAuth.github.secret,
      callbackURL: "/api/auth/github/callback",
      scope: ["user:email"],
    },
    async function (
      accToken: any,
      refreshToken: any,
      profile: any,
      done: Function
    ) {
      const { displayName, photos, emails } = profile;
      if (!displayName || !photos || !emails)
        throw new Error("Authentication failed");
      const email = emails[0].value;
      const avatarImg = photos[0].value;
      console.log(avatarImg);
      const userExists = await USER.findOne({ email });
      if (userExists) {
        const newUser = await USER.findOneAndUpdate(
          { email },
          {
            $set: {
              avatarImg,
            },
          },
          { new: true }
        );
        return done(null, newUser);
      }
      const User = new USER({
        name: displayName,
        email,
        avatarImg,
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
