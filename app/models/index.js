const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    underscored: false,
  },
});

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.dance = require("./dance")(sequelize, Sequelize);
db = require("./banner.js")(sequelize, Sequelize, db);
db.genre = require("./genre.js")(sequelize, Sequelize);
db.dancegenre = require("./dancegenre.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.userparticipation = require("./userparticipation.js")(sequelize, Sequelize);
db.invite = require("./invite.js")(sequelize, Sequelize);

module.exports = db;
