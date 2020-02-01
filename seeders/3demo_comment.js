/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'comments',
      [
        {
          userId: 1,
          postId: 1,
          commentId: null,
          content: 'yeah boi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          postId: 1,
          commentId: null,
          content: 'yeah boi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          postId: 1,
          commentId: null,
          content: 'yeah boi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          postId: 1,
          commentId: null,
          content: 'yeah boi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          postId: 1,
          commentId: null,
          content: 'yeah boi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
