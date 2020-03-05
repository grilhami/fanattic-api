module.exports = (sequelize, DataTypes) => {
  const report_type = sequelize.define(
    'report_type',
    {
      name: DataTypes.STRING,
    },
    {},
  );
  report_type.associate = models => {
    // associations can be defined here
    report_type.hasMany(models.reported_post, { foreignKey: 'report_typeId' });
  };
  return report_type;
};
