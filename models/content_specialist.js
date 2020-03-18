module.exports = (sequelize, DataTypes) => {
    const content_specialist = sequelize.define(
      'content_specialist',
      {
        userId:DataTypes.INTEGER,
        platform: DataTypes.STRING
      },
      {},
    );
    content_specialist.associate = models => {
      // associations can be defined here
      content_specialist.belongsTo(models.user, { foreignKey: "userId" });
    };
    return content_specialist;
  };
  