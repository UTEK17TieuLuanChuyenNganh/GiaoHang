'use strict';
module.exports = (sequelize, DataTypes) => {
  const NguoiDung = sequelize.define('NguoiDung', {
    HoTen: DataTypes.STRING,
    SinhNhat: DataTypes.DATE,
    GioiTinh: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
    Email: DataTypes.STRING,
    SDT: DataTypes.STRING,
    laShop: DataTypes.BOOLEAN,
    isDisable: DataTypes.BOOLEAN
  }, {});
  NguoiDung.associate = function(models) {
    NguoiDung.hasMany(models.DonHang, { as: 'nguoidung_donhang' });
    NguoiDung.hasMany(models.Shipper,  {as: 'nguoidung_shipper'});         
  };
  return NguoiDung;
};