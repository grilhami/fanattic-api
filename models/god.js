module.exports = (sequelize, DataTypes) => {
    const god = sequelize.define(
      'god',
      {
        userId:DataTypes.INTEGER,
        company: DataTypes.STRING
      },
      {},
    );
    god.associate = models => {
      // associations can be defined here
      god.belongsTo(models.user, { foreignKey: "userId" });
    };
    return god;
  };
  