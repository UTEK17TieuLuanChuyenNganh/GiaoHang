'use strict';
module.exports = (sequelize, DataTypes) => {
  const DSSanPham = sequelize.define('DSSanPham', {
    SoLuong: DataTypes.INTEGER
  }, {});
  DSSanPham.associate = function(models) {
    DSSanPham.belongsTo(models.DonHang, {foreignKey: 'DonHangId'});      
    DSSanPham.belongsTo(models.SanPham, {foreignKey: 'SanPhamId'});  
  };
  return DSSanPham;
};