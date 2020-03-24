module.exports = (sequelize, DataTypes) => {
    const artist_saved_post = sequelize.define(
      'artist_saved_post',
      {
        artistId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
      },
      {},
    );
    artist_saved_post.associate = models => {
      // associations can be defined here
      artist_saved_post.belongsTo(models.artist, { foreignKey: 'artistId' });
      artist_saved_post.belongsTo(models.post, { foreignKey: 'postId' });
    };
    return artist_saved_post;
  };
  