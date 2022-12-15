'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'status', { type : Sequelize.ENUM('active','suspended','archived')});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'status', { type : Sequelize.ENUM('active','suspended','archived')});
  }
};