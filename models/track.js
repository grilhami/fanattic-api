module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define(
    'track',
    {
      albumId: DataTypes.INTEGER,
      urlSongFile: DataTypes.STRING,
      image: DataTypes.STRING,
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
      explicitContent: DataTypes.BOOLEAN,
      lyricsLanguage: DataTypes.STRING,
      lyrics: DataTypes.TEXT,
      yearOfRelease: DataTypes.INTEGER,
      copyrights: DataTypes.STRING,
    },
    {},
  );
  track.associate = models => {
    // associations can be defined here
    track.belongsTo(models.album, { foreignKey: 'albumId' });
  };
  return track;
};
