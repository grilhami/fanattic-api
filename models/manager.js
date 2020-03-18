module.exports = (sequelize, DataTypes) => {
    const manager = sequelize.define(
      'manager',
      {
        userId:DataTypes.INTEGER,
        company: DataTypes.STRING
      },
      {},
    );
    manager.associate = models => {
      // associations can be defined here
      manager.belongsTo(models.user, { foreignKey: "userId" });
    };
    return manager;
  };
  