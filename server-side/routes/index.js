const Spotify = require("./Spotify");

const contructorMethod = (app) => {
  app.use("/Profile", Spotify);
};
