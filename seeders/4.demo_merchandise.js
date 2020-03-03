/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'merchandises',
      [
        {
          name: 'This thing you gotta buy',
          price: 420000,
          description: 'Only for the biggest of fans!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'This thing you gotta buy',
          price: 420000,
          description: 'Only for the biggest of fans!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'This thing you gotta buy',
          price: 420000,
          description: 'Only for the biggest of fans!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'This thing you gotta buy',
          price: 420000,
          description: 'Only for the biggest of fans!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'This thing you gotta buy',
          price: 420000,
          description: 'Only for the biggest of fans!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('merchandises', null, {});
  },
};
