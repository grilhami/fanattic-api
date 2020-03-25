module.exports = (sequelize, DataTypes) => {
    const subgenre = sequelize.define(
      'subgenre',
      {
          genreId: DataTypes.INTEGER,
          name: DataTypes.STRING
      },
    );
    subgenre.associate = models => {
      // associations can be defined here
      subgenre.belongsTo(models.genre, { foreignKey: "genreId" });
    };
    return subgenre;
  };
  