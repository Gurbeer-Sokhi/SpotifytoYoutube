const Spotify = require("./Spotify");

const constructorMethod = (app) => {
  app.use("/", Spotify);

  app.use("*", (req, res) => {
    res.sendStatus(404).render("Error", { e: "Page Not Found!" });
  });
};

module.exports = constructorMethod;
