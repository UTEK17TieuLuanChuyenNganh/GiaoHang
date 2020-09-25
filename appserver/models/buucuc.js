'use strict';
module.exports = (sequelize, DataTypes) => {
  const BuuCuc = sequelize.define('BuuCuc', {
    TenChiNhanh: DataTypes.STRING,
    DiaChi: DataTypes.STRING
  }, {});
  BuuCuc.associate = function(models) {
    BuuCuc.hasMany(models.DonHang, {as: 'buucuc_donhang' });
    BuuCuc.hasMany(models.ChuoiGiaoHang, {as: 'buucuc_chuoigiaohang' });
  };
  return BuuCuc;
};