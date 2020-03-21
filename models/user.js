module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      //bio: DataTypes.TEXT,
      password: DataTypes.STRING,
      age: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      //profilePicture: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      lastLogin: DataTypes.DATE,
      fcmToken: DataTypes.STRING,
      type: DataTypes.STRING,
      location: DataTypes.STRING
    },
    {},
  );
  user.associate = models => {
    // associations can be defined here
    user.hasMany(models.post, { foreignKey: 'userId' });
    user.hasMany(models.comment, { foreignKey: 'userId' });
    user.hasMany(models.story, { foreignKey: 'userId' });
    user.hasMany(models.user_saved_posts, {
      foreignKey: 'userId',
      as: 'savedPosts',
    });
    user.hasOne(models.artist, { foreighKey: "userId" });
  };
  return user;
};
