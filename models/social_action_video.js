module.exports = (sequelize, DataTypes) => {
    const social_action_video = sequelize.define('social_action_video', {
        socialActionId: DataTypes.INTEGER,
        artistId: DataTypes.INTEGER,
        cover: DataTypes.STRING,
        url: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.TEXT
  
    }, {});
    social_action_video.associate = function(models) {
      // associations can be defined here
      social_action_video.belongsTo(models.social_action, { foreignKey: 'socialActionId' });
    };
    return social_action_video;
};