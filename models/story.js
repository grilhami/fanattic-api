module.exports = (sequelize, DataTypes) => {
    const story = sequelize.define('story', {
        userId: DataTypes.INTEGER,
        url: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
    }, {});
    story.associate = function(models) {
      // associations can be defined here
      story.belongsTo(models.user, { foreignKey: 'userId' });
    };
    return story;
  };