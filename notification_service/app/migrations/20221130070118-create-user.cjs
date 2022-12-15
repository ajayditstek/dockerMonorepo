'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        //autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING(24),
        defaultValue: Sequelize.UUIDV4,
      },
      fullName: {
        type: Sequelize.STRING(100)
      },
      DOB: {
        type: Sequelize.DATE
      },
      email: {
        type: Sequelize.STRING(200)
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};