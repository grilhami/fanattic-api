module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      subgenre: {
        type: Sequelize.STRING,
      },
      length: {
        type: Sequelize.INTEGER,
      },
      numberOfTracks: {
        type: Sequelize.INTEGER,
      },
      primaryArtist: {
        type: Sequelize.STRING,
      },
      featuredArtist: {
        type: Sequelize.STRING,
      },
      publisher: {
        type: Sequelize.STRING,
      },
      additionalContributors: {
        type: Sequelize.STRING,
      },
      albumYear: {
        type: Sequelize.STRING,
      },
      releaseLanguage: {
        type: Sequelize.STRING,
      },
      copyrights: {
        type: Sequelize.STRING,
      },
      collectionType: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('albums');
  },
};
