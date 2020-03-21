module.exports = (sequelize, DataTypes) => {
  const video = sequelize.define('video', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    caption: DataTypes.TEXT

  }, {});
  video.associate = function(models) {
    // associations can be defined here
  };
  return video;
};