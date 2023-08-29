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
  } catch (e) {
    console.log(e);
  }
};

const RefreshToken = async () => {
  console.log("refresh token ", env.refresh_token);
  try {
    let authOptions = {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${env.refresh_token}`,
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
