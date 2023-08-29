const express = require("express");
const router = express.Router();
const index = require("../data/index");
const login = index.login;
const bodyParser = require("body-parser");
const redirect_uri = "http://localhost:5000/account";
const redirect_uri_auth = "http://localhost:5000/profile";
const querystring = require("querystring");
const axios = require("axios");
const Spotify = index.Spotify;
const env = process.env;

const scope = "user-read-private user-read-email";
const client_id = env.SPOTIFY_CLIENT_ID;
const client_secret = env.SPOTIFY_CLIENT_SECRET;

const generateRandomString = (length) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const state = generateRandomString(16);

router.route("/login").get(async (req, res) => {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

router.route("/account").get(async (req, res) => {
  try {
    let AuthResponse = await Spotify.auth(redirect_uri, req.query.code);
    if (AuthResponse.status == 200) {
      env.refresh_token = AuthResponse.data.refresh_token;
      res.redirect("/profile");
    } else {
      res.redirect("/#" + querystring.stringify({ error: AuthResponse }));
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.route("/profile").get(async (req, res) => {
  res.send("profile");
});

router.route("/refresh_token").get(async (req, res) => {
  try {
    let refresh_token = req.query.refresh_token;
    let access_token = await Spotify.RefreshToken(refresh_token);
    console.log(
      "returned access_token",
      access_token.json().then((data) => {
        console.log("data", data);
        env.access_token = data.access_token;
      })
    );
    res.send(access_token);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
