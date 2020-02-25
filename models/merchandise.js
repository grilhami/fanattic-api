module.exports = (sequelize, DataTypes) => {
  const merchandise = sequelize.define(
    'merchandise',
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {},
  );
  merchandise.associate = models => {
    // associations can be defined here
    merchandise.hasMany(models.merchandise_images, {
      forignKey: 'merchandiseId',
      as: 'images',
    });
    merchandise.hasMany(models.merchandise_links, {
      forignKey: 'merchandiseId',
      as: 'links',
    });
  };
  return merchandise;
};
