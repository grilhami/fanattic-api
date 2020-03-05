/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'report_types',
      [
        {
          name: 'Konten tidak wajar',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Asusila',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kekerasan',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Berita Palsu',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Penjualan Ilegal',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ujaran Kebencian',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Isu Terorisme',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: ' Peniupan atau Pemalsuan',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Pelecehan atau Kekeranas',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('report_types', null, {});
  },
};
