import passport from "passport";
import { Strategy as GoogleLogin } from "passport-google-oauth20";
import USER from "src/model/User";

passport.use(new GoogleLogin({
    clientID:process.env.GOOGLE_CLIENT || "your_google_client_id",
    clientSecret:process.env.GOOGLE_SECRET || "your_google_secret",
    callbackURL:"/auth/google/callback"
}, function(accToken, refreshToken, profile, done){
    console.log()
    done(null, profile)
}))


