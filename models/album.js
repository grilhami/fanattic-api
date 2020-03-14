module.exports = (sequelize, DataTypes) => {
    const album = sequelize.define(
      'album',
      {
        trackId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        title: DataTypes.STRING,
        genre: DataTypes.STRING,
        subgenre: DataTypes.STRING,
        length: DataTypes.INTEGER,
        numberOfTracks: DataTypes.INTEGER,
        primaryArtist: DataTypes.STRING,
        featuredArtist: DataTypes.STRING,
        publisher: DataTypes.STRING,
        additionalContributors: DataTypes.STRING,
        albumYear: DataTypes.STRING,
        releaseLanguage: DataTypes.STRING,
        copyrights: DataTypes.STRING,
        collectionType: DataTypes.STRING
      },
      {},
    );

    album.associate = models => {
      // associations can be defined here
      album.hasMany(models.track, { foreignKey: 'trackId' });
    };
    return album;
  };
  