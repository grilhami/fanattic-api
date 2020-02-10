'use strict';
module.exports = (sequelize, DataTypes) => {
  const merchandise_images = sequelize.define('merchandise_images', {
    url: DataTypes.STRING
  }, {});
  merchandise_images.associate = function(models) {
    // associations can be defined here
  };
  return merchandise_images;
};