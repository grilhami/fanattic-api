module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    'comment',
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {},
  );
  comment.associate = models => {
    // associations can be defined here
    comment.hasMany(models.comment, { foreignKey: 'commentId' });

    comment.belongsTo(models.user, { foreignKey: 'userId' });
    comment.belongsTo(models.post, { foreignKey: 'postId' });
    // comment.belongsTo(models.comment, { foreignKey: 'commentId' });
  };
  return comment;
};
