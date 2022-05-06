module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nickname: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    avatar_url: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    is_deleted: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    access_token: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });

  return user;
};
