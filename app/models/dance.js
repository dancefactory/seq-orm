module.exports = (sequelize, Sequelize, db) => {
  const dance = sequelize.define("Dance", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },
    story: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },
    video_url: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },
    thumbnail_url: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },
    youtube_registration_date: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    genre: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },
    tags: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },
  });

  // db.dance = dance;
  // db.genre = genre;
  // db.dancegenre = dancegenre;
  return dance;
};
