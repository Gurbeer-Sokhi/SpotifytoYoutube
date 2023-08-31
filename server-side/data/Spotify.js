const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const axios = require("axios");
const { response } = require("express");
const FormData = require("formdata");
const querystring = require("querystring");
const request = require("request");
const env = process.env;
let refresh_token = env.refresh_token;
// let access_token;
const formData = new FormData();
const fetch = require("node-fetch");
const SpotifyWebApi = require("spotify-web-api-node");

const auth = async (redirect_uri, code) => {
  try {
    const spotifyResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: redirect_uri,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (spotifyResponse.status == 200) {
      return spotifyResponse;
    } else {
      return "invalid_token";
    }

    // const spotifyApi = new SpotifyWebApi({
    //   redirectUri: redirect_uri,
    //   clientId: client_id,
    //   clientSecret: client_secret,
    // });

    // spotifyApi
    //   .authorizationCodeGrant(code)
    //   .then((data) => {
    //     return {
    //       accessToken: data.body.access_token,
    //       refreshToken: data.body.refresh_token,
    //       expiresIn: data.body.expires_in,
    //       status: 200,
    //     };
    //   })
    //   .catch((err) => {
    //     return { status: 400 };
    //   });
  } catch (e) {
    console.log(e);
  }
};

const RefreshToken = async (refresh_token) => {
  // console.log("refresh token ", env.refresh_token);
  try {
    let authOptions = {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    };

    let new_token = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    // console.log(new_token.data);
    return new_token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { auth, RefreshToken };
