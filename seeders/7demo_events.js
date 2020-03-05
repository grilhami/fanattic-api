/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'events',
      [
        {
          title: 'Open Concert Downtown',
          date: new Date(),
          location: 'Jakarta EXPO, Jakarta Barat',
          estPrice: 5000000,
          description:
            'Get your tickets now to the hottest musical festival of the season! Located in the heart of the city, come and enjoy the musical wonders of some of the greatest bands Indonesia has to offer. Tickets are limited and are on sale for a limited amount of time. Book yours now!',
          links: JSON.stringify(['tokopedia.tickets/memes', 'tiket.co/memers']),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Open Concert Downtown',
          date: new Date(),
          location: 'Jakarta EXPO, Jakarta Barat',
          estPrice: 5000000,
          description:
            'Get your tickets now to the hottest musical festival of the season! Located in the heart of the city, come and enjoy the musical wonders of some of the greatest bands Indonesia has to offer. Tickets are limited and are on sale for a limited amount of time. Book yours now!',
          links: JSON.stringify(['tokopedia.tickets/memes', 'tiket.co/memers']),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Open Concert Downtown',
          date: new Date(),
          location: 'Jakarta EXPO, Jakarta Barat',
          estPrice: 5000000,
          description:
            'Get your tickets now to the hottest musical festival of the season! Located in the heart of the city, come and enjoy the musical wonders of some of the greatest bands Indonesia has to offer. Tickets are limited and are on sale for a limited amount of time. Book yours now!',
          links: JSON.stringify(['tokopedia.tickets/memes', 'tiket.co/memers']),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Open Concert Downtown',
          date: new Date(),
          location: 'Jakarta EXPO, Jakarta Barat',
          estPrice: 5000000,
          description:
            'Get your tickets now to the hottest musical festival of the season! Located in the heart of the city, come and enjoy the musical wonders of some of the greatest bands Indonesia has to offer. Tickets are limited and are on sale for a limited amount of time. Book yours now!',
          links: JSON.stringify(['tokopedia.tickets/memes', 'tiket.co/memers']),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Open Concert Downtown',
          date: new Date(),
          location: 'Jakarta EXPO, Jakarta Barat',
          estPrice: 5000000,
          description:
            'Get your tickets now to the hottest musical festival of the season! Located in the heart of the city, come and enjoy the musical wonders of some of the greatest bands Indonesia has to offer. Tickets are limited and are on sale for a limited amount of time. Book yours now!',
          links: JSON.stringify(['tokopedia.tickets/memes', 'tiket.co/memers']),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {});
  },
};
