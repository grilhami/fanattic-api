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
          content: 'Love you guys!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          postId: 1,
          commentId: null,
          content: `Can't wait!`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          postId: 1,
          commentId: null,
          content: 'Just listened to your album this morning!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          postId: 1,
          commentId: 3,
          content: 'Same',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          postId: 1,
          commentId: 2,
          content: 'Me too!',
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
