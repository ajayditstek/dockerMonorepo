'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', { type : Sequelize.STRING(200)});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'password', { type : Sequelize.STRING(200)});
  }
};