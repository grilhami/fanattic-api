module.exports = (sequelize, DataTypes) => {
    const social_user_badge = sequelize.define('social_user_badge', {
        userId: DataTypes.INTEGER,
        socialActionId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        badgeType: DataTypes.STRING,
        logo: DataTypes.STRING
  
    }, {});
    social_user_badge.associate = function(models) {
      // associations can be defined here
      social_user_badge.hasMany(models.user, { foreignKey: 'userId'});
      social_user_badge.hasMany(models.social_action, { foreignKey: 'userId'});
    };
    return social_user_badge;
  };