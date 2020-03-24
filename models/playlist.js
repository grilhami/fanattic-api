module.exports = (sequelize, DataTypes) => {
    const playlist = sequelize.define(
      'playlist',
      {
          userId: DataTypes.INTEGER,
          name: DataTypes.STRING
      },
    );
    playlist.associate = models => {
      // associations can be defined here
      playlist.belongsTo(models.user, { foreignKey: 'userId' });
    };
    return playlist;
  };
  