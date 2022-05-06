module.exports = (sequelize, Sequelize, db) => {
  const banner = sequelize.define("Banner", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dance_id: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
  });
  const collection = sequelize.define("Collection", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    dance_id: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    user_id: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
  });
  db.banner = banner;
  db.collection = collection;
  return db;
};
