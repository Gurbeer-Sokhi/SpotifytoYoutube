const express = require("express");
const app = express();

const passport = require("passport");

const configRoutes = require("./routes/index");

configRoutes(app);

app.listen(5000, () => {
  console.log("listening on: 5000");
});
