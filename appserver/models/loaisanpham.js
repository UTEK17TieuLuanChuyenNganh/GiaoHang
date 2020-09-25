'use strict';
module.exports = (sequelize, DataTypes) => {
  const LoaiSanPham = sequelize.define('LoaiSanPham', {
    TenLoai: DataTypes.STRING,
    Hinh: DataTypes.TEXT,
    MoTa: DataTypes.STRING
  }, {});
  LoaiSanPham.associate = function(models) {
    LoaiSanPham.hasMany(models.SanPham, {as: 'loaisanpham_sanpham' });
  };
  return LoaiSanPham;
};