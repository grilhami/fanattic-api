'use strict';
module.exports = (sequelize, DataTypes) => {
  const merchandise = sequelize.define('merchandise', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  merchandise.associate = function(models) {
    // associations can be defined here
  };
  return merchandise;
};