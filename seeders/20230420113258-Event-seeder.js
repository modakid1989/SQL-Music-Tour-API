'use strict';

const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        name: 'Concert 1',
        date: '2022-06-01',
        start_time: Sequelize.fn('to_timestamp', '2022-06-01 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
        end_time: Sequelize.fn('to_timestamp', '2022-06-01 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
      },
      {
        name: 'Concert 2',
        date: '2022-06-15',
        start_time: Sequelize.fn('to_timestamp', '2022-06-15 19:30:00', 'YYYY-MM-DD HH24:MI:SS'),
        end_time: Sequelize.fn('to_timestamp', '2022-06-15 21:30:00', 'YYYY-MM-DD HH24:MI:SS'),
      },
      {
        name: 'Concert 3',
        date: '2022-06-30',
        start_time: Sequelize.fn('to_timestamp', '2022-06-30 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
        end_time: Sequelize.fn('to_timestamp', '2022-06-30 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};