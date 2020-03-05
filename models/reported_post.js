module.exports = (sequelize, DataTypes) => {
  const reported_post = sequelize.define(
    'reported_post',
    {
      postId: DataTypes.INTEGER,
      report_typeId: DataTypes.INTEGER,
      userComment: DataTypes.TEXT,
      isResolved: DataTypes.BOOLEAN,
      actionTaken: DataTypes.STRING,
    },
    {},
  );
  reported_post.associate = models => {
    // associations can be defined here
    reported_post.belongsTo(models.report_type, {
      foreignKey: 'report_typeId',
    });
  };
  return reported_post;
};
