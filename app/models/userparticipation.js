module.exports = (sequelize, Sequelize) => {
  const userparticipation = sequelize.define("UserParticipation", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING(255),
      defaultValue: null,
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

  return userparticipation;
};
