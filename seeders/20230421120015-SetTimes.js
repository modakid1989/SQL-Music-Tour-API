'use strict';

module.exports = {
up: async (queryInterface, Sequelize) => {
return queryInterface.bulkInsert('SetTimes', [
{
event_id: 1,
stage_id: 1,
band_id: 1,
start_time: new Date("2023-05-01T14:00:00.000Z"),
end_time: new Date("2023-05-01T15:00:00.000Z")
},
{
event_id: 1,
stage_id: 2,
band_id: 2,
start_time: new Date("2023-05-01T15:30:00.000Z"),
end_time: new Date("2023-05-01T16:30:00.000Z")
},
{
event_id: 1,
stage_id: 3,
band_id: 3,
start_time: new Date("2023-05-01T17:00:00.000Z"),
end_time: new Date("2023-05-01T18:00:00.000Z")
},
{
event_id: 2,
stage_id: 1,
band_id: 2,
start_time: new Date("2023-05-02T14:00:00.000Z"),
end_time: new Date("2023-05-02T15:00:00.000Z")
},
{
event_id: 2,
stage_id: 2,
band_id: 3,
start_time: new Date("2023-05-02T15:30:00.000Z"),
end_time: new Date("2023-05-02T16:30:00.000Z")
},
{
event_id: 2,
stage_id: 3,
band_id: 1,
start_time: new Date("2023-05-02T17:00:00.000Z"),
end_time: new Date("2023-05-02T18:00:00.000Z")
},
{
event_id: 3,
stage_id: 1,
band_id: 3,
start_time: new Date("2023-05-03T14:00:00.000Z"),
end_time: new Date("2023-05-03T15:00:00.000Z")
},
{
event_id: 3,
stage_id: 2,
band_id: 1,
start_time: new Date("2023-05-03T15:30:00.000Z"),
end_time: new Date("2023-05-03T16:30:00.000Z")
},
{
event_id: 3,
stage_id: 3,
band_id: 2,
start_time: new Date("2023-05-03T17:00:00.000Z"),
end_time: new Date("2023-05-03T18:00:00.000Z")
}
], {});
},

down: async (queryInterface, Sequelize) => {
return queryInterface.bulkDelete('SetTimes', null, {});
}
};