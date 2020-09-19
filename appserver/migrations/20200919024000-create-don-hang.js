'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DonHangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NgayDatHang: {
        type: Sequelize.DATE
      },
      TienVanChuyen: {
        type: Sequelize.NUMBER
      },
      TongTien: {
        type: Sequelize.NUMBER
      },
      GhiChu: {
        type: Sequelize.STRING
      },
      daThanhToan: {
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
    return queryInterface.dropTable('DonHangs');
  }
};