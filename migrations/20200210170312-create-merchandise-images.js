module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('merchandise_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      merchandiseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'merchandises',
          key: 'id',
        },
      },
      url: {
        allowNull: false,
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
    return queryInterface.dropTable('merchandise_images');
  },
};
