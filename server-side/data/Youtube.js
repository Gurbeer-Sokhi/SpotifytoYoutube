const axios = require("axios");
const Spotify = require("./Spotify");
require("dotenv").config();

const apiKey = process.env.API_KEY;

const createPlaylist = async (title, accessToken) => {
  try {
    const privacyStatus = "public";
    let createdPlaylist = await axios.post(
      `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&part=status`,
      {
        snippet: {
          title,
        },
        status: {
          privacyStatus,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return createdPlaylist;
  } catch (error) {
    if (error.response) {
      console.error("API Response:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};

const search = async (searchterm, accessToken) => {
  try {
    let encodedTerm = encodeURIComponent(searchterm);
    let searchList = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodedTerm}&key=${apiKey}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
        },
      }
    );

    return searchList.data;
  } catch (error) {
    console.log(error);
  }
};

const addSongs = async (
  YoutubePlaylistId,
  SpotifyPlaylistId,
  YaccessToken,
  SaccessToken
) => {
  try {
    let videoId;
    let addedVideos = [];
    let PlaylistToAdd = await Spotify.getPlaylist(
      SpotifyPlaylistId,
      SaccessToken
    );
    let tracks = PlaylistToAdd.tracks;
    for (let i = 0; i < tracks.length; i++) {
      let song = await search(tracks[i].name, YaccessToken);
      videoId = song.items[0].id.videoId;
      let AddedItem = await axios.post(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}`,
        {
          snippet: {
            playlistId: YoutubePlaylistId,
            resourceId: {
              kind: "youtube#video",
              videoId,
            },
          },
        },
        {
          headers: {
            Authorization: "Bearer " + YaccessToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      addedVideos.push(AddedItem.data.snippet.resourceId.videoId);
    }
    if (addedVideos.length == tracks.length) {
      return "Success";
    } else if (addedVideos.length == 0) {
      return "None tracks added";
    } else if (addedVideos.length < tracks.length) {
      return "Some tracks added";
    }
  } catch (e) {
    console.log(e);
  }
};

const test = async (YaccessToken, YoutubePlaylistId) => {
  try {
    let videoId = "II7T64qMrQs";
    let test = await axios.post(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}`,
      {
        snippet: {
          playlistId: YoutubePlaylistId,
          resourceId: {
            kind: "youtube#video",
            videoId,
          },
        },
      },
      {
        headers: {
          Authorization: "Bearer " + YaccessToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return test.data;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createPlaylist, search, addSongs, test };
