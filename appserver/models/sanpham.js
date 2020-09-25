'use strict';
module.exports = (sequelize, DataTypes) => {
  const SanPham = sequelize.define('SanPham', {
    TenSanPham: DataTypes.STRING,
    MoTa: DataTypes.STRING,
    Gia: DataTypes.DECIMAL,
    NgayCapNhat: DataTypes.DATE,
    KhuyenMai: DataTypes.DECIMAL,
    Hinh: DataTypes.TEXT,
    SoLuong: DataTypes.INTEGER,
    KichCo: DataTypes.DECIMAL,
    KhoiLuong: DataTypes.DECIMAL,
    DanhGia: DataTypes.STRING,
    isDisable: DataTypes.BOOLEAN
  }, {});
  SanPham.associate = function(models) {
    SanPham.hasMany(models.DSSanPham, {as: 'sanpham_dssanpham'});
    SanPham.belongsTo(models.LoaiSanPham, {foreignKey: 'LoaiSanPhamId'});
  };
  return SanPham;
};