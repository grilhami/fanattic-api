/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'merchandise_images',
      [
        {
          merchandiseId: 1,
          url:
            'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/1/6/0/0_a03556f4-da89-4a74-a5c5-e5d51240cfa5_378_504.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 2,
          url:
            'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/1/6/0/0_a03556f4-da89-4a74-a5c5-e5d51240cfa5_378_504.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 3,
          url:
            'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/1/6/0/0_a03556f4-da89-4a74-a5c5-e5d51240cfa5_378_504.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 4,
          url:
            'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/1/6/0/0_a03556f4-da89-4a74-a5c5-e5d51240cfa5_378_504.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 5,
          url:
            'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/1/6/0/0_a03556f4-da89-4a74-a5c5-e5d51240cfa5_378_504.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 1,
          url:
            'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/1/6/0/0_a03556f4-da89-4a74-a5c5-e5d51240cfa5_378_504.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 2,
          url:
            'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/1/6/0/0_a03556f4-da89-4a74-a5c5-e5d51240cfa5_378_504.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 3,
          url:
            'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/1/6/0/0_a03556f4-da89-4a74-a5c5-e5d51240cfa5_378_504.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 4,
          url:
            'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/1/6/0/0_a03556f4-da89-4a74-a5c5-e5d51240cfa5_378_504.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 5,
          url:
            'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/1/6/0/0_a03556f4-da89-4a74-a5c5-e5d51240cfa5_378_504.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('merchandise_images', null, {});
  },
};
