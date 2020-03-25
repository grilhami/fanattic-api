module.exports = (sequelize, DataTypes) => {
    const playlist_content = sequelize.define(
      'playlist_content',
      {
          playlistId: DataTypes.INTEGER,
          trackId: DataTypes.INTEGER
      },
    );
    playlist_content.associate = models => {
      // associations can be defined here
      playlist_content.belongsTo(models.playlist, { foreignKey: 'playlistId' });
    };
    return playlist_content;
  };
  