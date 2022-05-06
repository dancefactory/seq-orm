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
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    is_deleted: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    access_token: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  });
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

  const invite = sequelize.define("Invite", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    invitation_code: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },
    is_usable: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    invited_user_id: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    user_id: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
  });

  return invite;
};
