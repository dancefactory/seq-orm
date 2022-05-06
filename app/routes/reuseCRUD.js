/*
재사용가능 mongoose CRUD 기능과 model처리
재사용가능한 CRUD는 ./controller/reuseCRUD.js
모든 모델을 한곳에서 처리함 ./model/models.js
*/

const crud = require("../controllers/reuseCRUD");
module.exports = (app) => {
  const db = require("../models");

  //for project router
  app.use("/api/user", crud(db.user));
  app.use("/api/userparticipation", crud(db.userparticipation));
  app.use("/api/invite", crud(db.invite));
  app.use("/api/dance", crud(db.dance));
  app.use("/api/genre", crud(db.genre));
  app.use("/api/dancegenre", crud(db.dancegenre));
  app.use("/api/banner", crud(db.banner));
  app.use("/api/collection", crud(db.collection));
};
