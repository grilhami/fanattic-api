module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      isVerified: {
        defaultValue: false,
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      fcmToken: {
        defaultValue: false,
        allowNull: true,
        type: Sequelize.STRING,
      },
      lastLogin: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
