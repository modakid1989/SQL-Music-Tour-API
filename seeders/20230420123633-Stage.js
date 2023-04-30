'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stages', [
      {
        stage_name: 'Main Stage',
        capacity: 5000,
        sound_system: 'JBL'
      },
      {
        stage_name: 'Acoustic Stage',
        capacity: 100,
        sound_system: 'Bose'
      },
      {
        stage_name: 'DJ Stage',
        capacity: 500,
        sound_system: 'Pioneer'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stages', null, {});
  }
};