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
    merchandise.hasMany(models.merchanise_images, {
      forignKey: 'merchandiseId',
      as: 'images',
    });
    merchandise.hasMany(models.merchanise_links, {
      forignKey: 'merchandiseId',
      as: 'links',
    });
  };
  return merchandise;
};
