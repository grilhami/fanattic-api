module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      caption: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      isHidden: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      likes: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      shares: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isSocial: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('posts');
  },
};
