/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'merchandise_links',
      [
        {
          merchandiseId: 1,
          url:
            'https://www.tokopedia.com/music-club/cd-greenday-greatest-hits-god-s-favourite-band-2017-special-price?trkid=f%3DCa0000L000P0W0S0Sh%2CCo0Po0Fr0Cb0_src%3Dsearch_page%3D1_ob%3D23_q%3Dband+cd_bmexp%3D0_po%3D7_catid%3D1517_bmexp%3D0&whid=0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 2,
          url:
            'https://www.tokopedia.com/music-club/cd-greenday-greatest-hits-god-s-favourite-band-2017-special-price?trkid=f%3DCa0000L000P0W0S0Sh%2CCo0Po0Fr0Cb0_src%3Dsearch_page%3D1_ob%3D23_q%3Dband+cd_bmexp%3D0_po%3D7_catid%3D1517_bmexp%3D0&whid=0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 3,
          url:
            'https://www.tokopedia.com/music-club/cd-greenday-greatest-hits-god-s-favourite-band-2017-special-price?trkid=f%3DCa0000L000P0W0S0Sh%2CCo0Po0Fr0Cb0_src%3Dsearch_page%3D1_ob%3D23_q%3Dband+cd_bmexp%3D0_po%3D7_catid%3D1517_bmexp%3D0&whid=0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 4,
          url:
            'https://www.tokopedia.com/music-club/cd-greenday-greatest-hits-god-s-favourite-band-2017-special-price?trkid=f%3DCa0000L000P0W0S0Sh%2CCo0Po0Fr0Cb0_src%3Dsearch_page%3D1_ob%3D23_q%3Dband+cd_bmexp%3D0_po%3D7_catid%3D1517_bmexp%3D0&whid=0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 5,
          url:
            'https://www.tokopedia.com/music-club/cd-greenday-greatest-hits-god-s-favourite-band-2017-special-price?trkid=f%3DCa0000L000P0W0S0Sh%2CCo0Po0Fr0Cb0_src%3Dsearch_page%3D1_ob%3D23_q%3Dband+cd_bmexp%3D0_po%3D7_catid%3D1517_bmexp%3D0&whid=0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 1,
          url:
            'https://www.tokopedia.com/music-club/cd-greenday-greatest-hits-god-s-favourite-band-2017-special-price?trkid=f%3DCa0000L000P0W0S0Sh%2CCo0Po0Fr0Cb0_src%3Dsearch_page%3D1_ob%3D23_q%3Dband+cd_bmexp%3D0_po%3D7_catid%3D1517_bmexp%3D0&whid=0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 2,
          url:
            'https://www.tokopedia.com/music-club/cd-greenday-greatest-hits-god-s-favourite-band-2017-special-price?trkid=f%3DCa0000L000P0W0S0Sh%2CCo0Po0Fr0Cb0_src%3Dsearch_page%3D1_ob%3D23_q%3Dband+cd_bmexp%3D0_po%3D7_catid%3D1517_bmexp%3D0&whid=0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 3,
          url:
            'https://www.tokopedia.com/music-club/cd-greenday-greatest-hits-god-s-favourite-band-2017-special-price?trkid=f%3DCa0000L000P0W0S0Sh%2CCo0Po0Fr0Cb0_src%3Dsearch_page%3D1_ob%3D23_q%3Dband+cd_bmexp%3D0_po%3D7_catid%3D1517_bmexp%3D0&whid=0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 4,
          url:
            'https://www.tokopedia.com/music-club/cd-greenday-greatest-hits-god-s-favourite-band-2017-special-price?trkid=f%3DCa0000L000P0W0S0Sh%2CCo0Po0Fr0Cb0_src%3Dsearch_page%3D1_ob%3D23_q%3Dband+cd_bmexp%3D0_po%3D7_catid%3D1517_bmexp%3D0&whid=0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merchandiseId: 5,
          url:
            'https://www.tokopedia.com/music-club/cd-greenday-greatest-hits-god-s-favourite-band-2017-special-price?trkid=f%3DCa0000L000P0W0S0Sh%2CCo0Po0Fr0Cb0_src%3Dsearch_page%3D1_ob%3D23_q%3Dband+cd_bmexp%3D0_po%3D7_catid%3D1517_bmexp%3D0&whid=0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('merchandise_links', null, {});
  },
};
