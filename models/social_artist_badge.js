module.exports = (sequelize, DataTypes) => {
    const social_artist_badge = sequelize.define('social_artist_badge', {
        artistId: DataTypes.INTEGER,
        socialActionId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        badgeType: DataTypes.STRING,
        logo: DataTypes.STRING
  
    }, {});
    social_artist_badge.associate = function(models) {
      // associations can be defined here
      social_artist_badge.belongsTo(models.artist, { 
          foreignKey: 'artistId'
        });
      social_artist_badge.belongsTo(models.social_action, { 
        foreignKey: 'socialActionId'
      });
    };
    return social_artist_badge;
  };