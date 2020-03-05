module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reported_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      report_typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'report_types',
          key: 'id',
        },
      },
      userComment: {
        type: Sequelize.TEXT,
      },
      isResolved: {
        defaultValue: false,
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      actionTaken: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('reported_posts');
  },
};
