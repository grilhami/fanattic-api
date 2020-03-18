module.exports = (sequelize, DataTypes) => {
    const artist = sequelize.define(
      'artist',
      {
        userId:DataTypes.INTEGER,
        label: DataTypes.STRING
      },
      {},
    );
    artist.associate = models => {
      // associations can be defined here
      artist.belongsTo(models.user, { foreignKey: "userId" });
    };
    return artist;
  };
  