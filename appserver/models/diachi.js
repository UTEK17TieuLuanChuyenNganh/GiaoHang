'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiaChi = sequelize.define('DiaChi', {
    TenDiaChi: DataTypes.STRING,
    laMacDinh: DataTypes.BOOLEAN
  }, {});
  DiaChi.associate = function(models) {
    DiaChi.hasMany(models.DiaChiXacNhan, {as: 'diachi_diachixacnhan' });  
    DiaChi.hasMany(models.DonHang, { as: 'diachi_donhang' });    
  };
  return DiaChi;
};