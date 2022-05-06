const proc = require("../controllers/proc");
module.exports = (app) => {
  const db = require("../models");

  //for project router
  app.use("/api/danceinput", proc.danceInput);
  app.use("/api/danceget", proc.danceGet);
  app.use("/api/dancegetall", proc.danceGetAll);
  app.use("/api/userlike", proc.userlike);
};
