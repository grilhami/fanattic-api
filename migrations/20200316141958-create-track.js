module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      image: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      subgenre: {
        type: Sequelize.STRING,
      },
      writer: {
        type: Sequelize.STRING,
      },
      albumName: {
        type: Sequelize.STRING,
      },
      length: {
        type: Sequelize.INTEGER,
      },
      trackNumber: {
        type: Sequelize.INTEGER,
      },
      primaryArtist: {
        type: Sequelize.STRING,
      },
      featuredArtist: {
        type: Sequelize.STRING,
      },
      composer: {
        type: Sequelize.STRING,
      },
      publisher: {
        type: Sequelize.STRING,
      },
      producers: {
        type: Sequelize.STRING,
      },
      additionalContributors: {
        type: Sequelize.STRING,
      },
      explicitContent: {
        type: Sequelize.STRING,
      },
      lyricsLanguage: {
        type: Sequelize.STRING,
      },
      lyricsPublisher: {
        type: Sequelize.STRING,
      },
      yearOfComposition: {
        type: Sequelize.INTEGER,
      },
      masterRecordingOwner: {
        type: Sequelize.STRING,
      },
      yearOfRecording: {
        type: Sequelize.INTEGER,
      },
      releaseLanguage: {
        type: Sequelize.STRING,
      },
      copyrights: {
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
    return queryInterface.dropTable('tracks');
  },
};
