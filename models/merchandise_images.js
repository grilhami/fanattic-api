module.exports = (sequelize, DataTypes) => {
  const merchandise_images = sequelize.define(
    'merchandise_images',
    {
      merchandiseId: DataTypes.INTEGER,
      url: DataTypes.STRING,
    },
    {},
  );
  merchandise_images.associate = models => {
    // associations can be defined here
    merchandise_images.belongsTo(models.merchandise, {
      foreignKey: 'merchandiseId',
    });
  };
  return merchandise_images;
};
