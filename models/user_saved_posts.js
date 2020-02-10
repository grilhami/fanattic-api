'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_saved_posts = sequelize.define('user_saved_posts', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  user_saved_posts.associate = function(models) {
    // associations can be defined here
  };
  return user_saved_posts;
};