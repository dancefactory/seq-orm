module.exports = (sequelize, Sequelize) => {
  const dancegenre = sequelize.define("DanceGenre", {
    genre_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dance_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return dancegenre;
};
