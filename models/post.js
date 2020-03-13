module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    'post',
    {
      userId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      caption: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      shares: DataTypes.INTEGER,
    },
    {},
  );
  post.associate = models => {
    // associations can be defined here
    post.hasMany(models.comment, { foreignKey: 'postId', onDelete: 'CASCADE' });

    post.belongsTo(models.user, { foreignKey: 'userId' });
  };
  return post;
};
