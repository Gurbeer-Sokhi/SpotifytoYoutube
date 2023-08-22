const express = require("express");
const passport = require("passport");

require("./auth");
const app = express();

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get("/protected", (req, res) => {
  res.send("Hellooo");
});

app.listen(5000, () => {
  console.log("listening on: 5000");
});
