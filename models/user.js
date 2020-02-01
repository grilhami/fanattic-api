module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      lastLogin: DataTypes.DATE,
    },
    {},
  );
  user.associate = models => {
    // associations can be defined here
    user.hasMany(models.post, { foreignKey: 'userId' });
    user.hasMany(models.comment, { foreignKey: 'userId' });
  };
  return user;
};
