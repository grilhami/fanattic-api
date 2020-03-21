module.exports = (sequelize, DataTypes) => {
    const social_action = sequelize.define('social_action', {
        artistId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        cover: DataTypes.STRING,
        videoOneUrl: DataTypes.STRING,
        videoTworUrl: DataTypes.STRING,
        videoThreeUrl: DataTypes.STRING,
        videoFourUrl: DataTypes.STRING,
  
    }, {});
    social_action.associate = function(models) {
      // associations can be defined here
      social_action.belongsTo(models.artist, { foreignKey: 'artistId' });
    };
    return social_action;
  };