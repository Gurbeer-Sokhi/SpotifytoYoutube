const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const axios = require("axios");
const querystring = require("querystring");

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

    if (spotifyResponse) {
      console.log("Response", spotifyResponse.data.access_token);
      return spotifyResponse.status;
    } else {
      return "fail";
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { auth };
