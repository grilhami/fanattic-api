/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'test@yahoo.com',
          username: 'test',
          password: 'test',
          phone: '08181818',
          fullName: 'Leroy Jenkins',
          isVerified: true,
          lastLogin: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
