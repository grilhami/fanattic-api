'use strict';
module.exports = (sequelize, DataTypes) => {
  const merchandise_links = sequelize.define('merchandise_links', {
    url: DataTypes.STRING
  }, {});
  merchandise_links.associate = function(models) {
    // associations can be defined here
  };
  return merchandise_links;
};