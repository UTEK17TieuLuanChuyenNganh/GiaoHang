'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shippers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CMND: {
        type: Sequelize.NUMBER
      },
      STK: {
        type: Sequelize.NUMBER
      },
      Diem: {
        type: Sequelize.NUMBER
      },
      PhuongTienVanChuyen: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Shippers');
  }
};