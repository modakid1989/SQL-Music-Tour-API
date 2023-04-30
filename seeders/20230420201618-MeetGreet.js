'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MeetGreets', [
      {
        event_id: 1,
        band_id: 1,
        meet_start_time: new Date("2023-05-01T10:00:00.000Z"),
        meet_end_time: new Date("2023-05-01T11:00:00.000Z")
      },
      {
        event_id: 1,
        band_id: 2,
        meet_start_time: new Date("2023-05-01T12:00:00.000Z"),
        meet_end_time: new Date("2023-05-01T13:00:00.000Z")
      },
      {
        event_id: 2,
        band_id: 1,
        meet_start_time: new Date("2023-05-02T10:00:00.000Z"),
        meet_end_time: new Date("2023-05-02T11:00:00.000Z")
      },
      {
        event_id: 2,
        band_id: 3,
        meet_start_time: new Date("2023-05-02T12:00:00.000Z"),
        meet_end_time: new Date("2023-05-02T13:00:00.000Z")
      },
      {
        event_id: 3,
        band_id: 2,
        meet_start_time: new Date("2023-05-03T10:00:00.000Z"),
        meet_end_time: new Date("2023-05-03T11:00:00.000Z")
      },
      {
        event_id: 3,
        band_id: 3,
        meet_start_time: new Date("2023-05-03T12:00:00.000Z"),
        meet_end_time: new Date("2023-05-03T13:00:00.000Z")
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MeetGreets', null, {});
  }
};