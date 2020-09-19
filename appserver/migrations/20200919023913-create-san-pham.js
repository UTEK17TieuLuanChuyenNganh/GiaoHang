'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SanPhams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TenSanPham: {
        type: Sequelize.STRING
      },
      MoTa: {
        type: Sequelize.STRING
      },
      Gia: {
        type: Sequelize.NUMBER
      },
      NgayCapNhat: {
        type: Sequelize.DATE
      },
      KhuyenMai: {
        type: Sequelize.NUMBER
      },
      Hinh: {
        type: Sequelize.TEXT
      },
      SoLuong: {
        type: Sequelize.NUMBER
      },
      KichCo: {
        type: Sequelize.NUMBER
      },
      KhoiLuong: {
        type: Sequelize.NUMBER
      },
      DanhGia: {
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
    return queryInterface.dropTable('SanPhams');
  }
};