'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    estPrice: DataTypes.INTEGER,
    description: DataTypes.STRING,
    links: DataTypes.STRING
  }, {});
  Events.associate = function(models) {
    // associations can be defined here
  };
  return Events;
};