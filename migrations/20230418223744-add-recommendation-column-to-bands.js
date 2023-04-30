'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bands', 'recommendation', {
      type: DataTypes.STRING
    });


  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bands', 'recommendation');

  }
};