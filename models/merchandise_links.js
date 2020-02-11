module.exports = (sequelize, DataTypes) => {
  const merchandise_links = sequelize.define(
    'merchandise_links',
    {
      url: DataTypes.STRING,
    },
    {},
  );
  merchandise_links.associate = models => {
    // associations can be defined here
    merchandise_links.belongsTo(models.merchandise, {
      foreignKey: 'merchandiseId',
    });
  };
  return merchandise_links;
};
