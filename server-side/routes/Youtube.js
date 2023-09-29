require("../auth");

require("dotenv").config({
  path: "C:\\Users\\gurbe\\Downloads\\Project\\SpotifytoYoutube\\SpotifytoYoutube\\server-side\\.env",
});

const express = require("express");
const session = require("express-session");
const router = express.Router();
const index = require("../data/index");
const login = index.login;
const bodyParser = require("body-parser");
const redirect_uri = "http://localhost:3000";
const querystring = require("querystring");
const axios = require("axios");
const Spotify = index.Spotify;
const Youtube = index.Youtube;
const passport = require("passport");

router.use(
  session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
router.use(passport.initialize());
router.use(passport.session());

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

const cors = require("cors");

router.use(cors());
router.use(bodyParser.json());

router
  .route("/ytlogin")
  .get(
    passport.authenticate("google", {
      scope: ["email", "profile"],
      accessType: "offline",
      prompt: "consent",
    })
  );

router.route("/ytcallback").get(
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/failure",
  })
);

router.route("/failure").get(async (req, res) => {
  res.send("something went wrong");
});

router.route("/").get(isLoggedIn, async (req, res) => {
  res.json({
    req: req.user,
  });
});

router.route("/createPlaylist").post(async (req, res) => {
  try {
    console.log("in playlist");
    let Playlist = await Youtube.createPlaylist(
      req.body.title,
      req.body.accessToken
    );

    console.log(Playlist);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
