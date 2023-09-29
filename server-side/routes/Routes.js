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

const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");

router.use(cors());
router.use(bodyParser.json());
const scope = "user-read-private user-read-email";
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const generateRandomString = (length) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let access_token = 0;
const state = generateRandomString(16);

let count = 0;
router.route("/login").get(async (req, res) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
});

router.route("/account").get(async (req, res) => {
  try {
    let code = req.query.code;
    // if (req.query.code) {
    //   let AuthResponse = await Spotify.auth(redirect_uri, code);
    //   if (AuthResponse?.status == 200) {
    //     access_token = AuthResponse.data.access_token;
    //     authres = {
    //       accessToken: AuthResponse.data.access_token,
    //       refreshToken: AuthResponse.data.refresh_token,
    //       expiresIn: AuthResponse.data.expires_in,
    //     };
    //     return res.json({
    //       accessToken: AuthResponse.data.access_token,
    //       refreshToken: AuthResponse.data.refresh_token,
    //       expiresIn: AuthResponse.data.expires_in,
    //     });
    //   } else {
    //     res.sendStatus(400);
    //   }
    // }

    console.log("id", client_id);
    const spotifyApi = new SpotifyWebApi({
      redirectUri: redirect_uri,
      clientId: client_id,
      clientSecret: client_secret,
    });

    await spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (e) {
    console.log(e);
  }
});

router.route("/refresh_token").get(async (req, res) => {
  try {
    console.log("in refresh");
    let refresh_token = req.query.refresh_token;
    let access_token = await Spotify.RefreshToken(refresh_token);
    console.log(
      "returned access_token",
      access_token.json().then((data) => {
        console.log("data", data);

        res.json({
          accessToken: data.access_token,
          expiresIn: data.expires_in,
        });
      })
    );
  } catch (e) {
    console.log(e);
  }
});

router.route("/playlist/:playlistId").get(async (req, res) => {
  try {
    let playlistId = req.params.playlistId;
    let playlist = await Spotify.getPlaylist(playlistId, access_token);
    if (playlist.status == 200) {
      console.log(playlist.data);
      res.json({
        tracks: playlist.data.tracks.items,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
