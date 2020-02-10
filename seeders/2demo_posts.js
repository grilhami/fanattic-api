/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'posts',
      [
        {
          userId: 1,
          image: 'blank',
          caption: 'Just finished an amazing jam session',
          likes: 10000,
          shares: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          image: 'blank',
          caption: 'Just finished an amazing jam session',
          likes: 10000,
          shares: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          image: 'blank',
          caption: 'Just finished an amazing jam session',
          likes: 10000,
          shares: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          image: 'blank',
          caption: 'Just finished an amazing jam session',
          likes: 10000,
          shares: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          image: 'blank',
          caption: 'Just finished an amazing jam session',
          likes: 10000,
          shares: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  },
};
