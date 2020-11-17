'use strict';
module.exports = (sequelize, DataTypes) => {
  const NguoiDung = sequelize.define('NguoiDung', {
    HoTen: DataTypes.STRING,
    SinhNhat: DataTypes.DATE,
    GioiTinh: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
    Avatar: DataTypes.TEXT,
    Email: DataTypes.STRING,
    SDT: DataTypes.STRING,
    laShop: DataTypes.BOOLEAN,
    isDisable: DataTypes.BOOLEAN
  }, {});
  NguoiDung.associate = function(models) {
    NguoiDung.hasMany(models.DonHang, { as: 'nguoidung_donhang' });
    NguoiDung.hasMany(models.Shipper,  {as: 'nguoidung_shipper'});
    NguoiDung.hasMany(models.DiaChi,  {as: 'nguoidung_diachi'});         
    NguoiDung.hasMany(models.ThongBao,  {as: 'nguoidung_thongbao'});         
  };
  return NguoiDung;
};