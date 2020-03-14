module.exports = (sequelize, DataTypes) => {
    const track = sequelize.define(
      'track',
      {
        trackId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        title: DataTypes.STRING,
        genre: DataTypes.STRING,
        subgenre: DataTypes.STRING,
        writer: DataTypes.STRING,
        albumName: DataTypes.STRING,
        length: DataTypes.INTEGER,
        trackNumber: DataTypes.INTEGER,
        primaryArtist: DataTypes.STRING,
        featuredArtist: DataTypes.STRING,
        composer: DataTypes.STRING,
        publisher: DataTypes.STRING,
        producers: DataTypes.STRING,
        additionalContributors: DataTypes.STRING,
        explicitContent: DataTypes.STRING,
        lyricsLanguage: DataTypes.STRING,
        lyricsPublisher: DataTypes.STRING,
        yearOfComposition: DataTypes.INTEGER,
        masterRecordingOwner: DataTypes.STRING,
        yearOfRecording: DataTypes.INTEGER,
        releaseLanguage: DataTypes.STRING,
        copyrights: DataTypes.STRING,
      },
      {},
    );

    track.associate = models => {
        // associations can be defined here
        track.belongsTo(models.album, { foreignKey: "trackId"});
    };

    return track;
  };
  