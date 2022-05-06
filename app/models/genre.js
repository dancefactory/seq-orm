module.exports = (sequelize, Sequelize) => {
  const genre = sequelize.define("Genre", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },
  });
  // const dancegenre = sequelize.define("DanceGenre", {
  //   genre_id: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
  //   dance_id: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
  // });

  return genre;
};
