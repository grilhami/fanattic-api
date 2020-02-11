module.exports = (sequelize, DataTypes) => {
  const user_saved_posts = sequelize.define(
    'user_saved_posts',
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {},
  );
  user_saved_posts.associate = models => {
    // associations can be defined here
    user_saved_posts.belongsTo(models.user, { foreignKey: 'userId' });
    user_saved_posts.belongsTo(models.post, { foreignKey: 'postId' });
  };
  return user_saved_posts;
};
