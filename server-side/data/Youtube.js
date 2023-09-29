const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.API_KEY;
const createPlaylist = async (title, accessToken) => {
  try {
    let createdPlaylist = await axios.post(
      `https://youtube.googleapis.com/youtube/v3/playlists?part=id&part=snippet&key=${apiKey}`,
      {
        headers: {
          Authorization: "Bearer" + accessToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          snippet: { title: title },
          status: { privacyStatus: "public" },
        },
      }
    );

    return createdPlaylist;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createPlaylist };
