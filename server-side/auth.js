const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "C:\\Users\\gurbe\\Downloads\\Project\\SpotifytoYoutube\\SpotifytoYoutube\\server-side\\.env",
  });
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/ytcallback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, params, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
