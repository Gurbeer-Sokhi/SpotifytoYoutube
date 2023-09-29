const Youtube = require("./Youtube");
const Routes = require("./Routes");

const constructorMethod = (app) => {
  app.use("/", Routes);
  app.use("/", Youtube);

  app.use("*", (req, res) => {
    res.sendStatus(404).render("Error", { e: "Page Not Found!" });
  });
};

module.exports = constructorMethod;
