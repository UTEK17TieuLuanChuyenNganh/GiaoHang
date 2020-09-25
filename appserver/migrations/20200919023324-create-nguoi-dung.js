'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NguoiDungs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HoTen: {
        type: Sequelize.STRING
      },
      SinhNhat: {
        type: Sequelize.DATE
      },
      GioiTinh: {
        type: Sequelize.STRING
      },
      Username: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      SDT: {
        type: Sequelize.STRING
      },
      laShop: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('NguoiDungs');
  }
};