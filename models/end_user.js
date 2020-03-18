module.exports = (sequelize, DataTypes) => {
    const end_user = sequelize.define(
      'end_user',
      {
        userId:DataTypes.INTEGER,
        preference: DataTypes.STRING
      },
      {},
    );
    end_user.associate = models => {
      // associations can be defined here
      end_user.belongsTo(models.user, { foreignKey: "userId" });
    };
    return end_user;
  };
  