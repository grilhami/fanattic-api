module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    'events',
    {
      title: DataTypes.STRING,
      date: DataTypes.DATE,
      location: DataTypes.STRING,
      estPrice: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      links: DataTypes.JSON,
    },
    {},
  );
  events.associate = models => {
    // associations can be defined here
  };
  return events;
};
