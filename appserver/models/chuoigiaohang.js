'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChuoiGiaoHang = sequelize.define('ChuoiGiaoHang', {
    Chuoi: DataTypes.STRING(10000),
    SoLuong: DataTypes.INTEGER
  }, {});
  ChuoiGiaoHang.associate = function(models) {
    ChuoiGiaoHang.belongsTo(models.Shipper, {foreignKey: 'ShipperId'});  
    ChuoiGiaoHang.hasMany(models.DonHang, { as: 'chuoigiaohang_donhang' });
    ChuoiGiaoHang.belongsTo(models.BuuCuc, {foreignKey: 'BuuCucId'});  
  };
  return ChuoiGiaoHang;
};