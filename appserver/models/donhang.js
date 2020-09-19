'use strict';
module.exports = (sequelize, DataTypes) => {
  const DonHang = sequelize.define('DonHang', {
    NgayDatHang: DataTypes.DATE,
    TienVanChuyen: DataTypes.DECIMAL,
    TongTien: DataTypes.DECIMAL,
    GhiChu: DataTypes.STRING,
    DanhGia: DataTypes.STRING,
    TinhTrangDon: DataTypes.STRING,
    daThanhToan: DataTypes.BOOLEAN
  }, {});
  DonHang.associate = function(models) {
    DonHang.hasMany(models.DSSanPham, { as: 'donhang_dssanpham' });
    DonHang.belongsTo(models.BuuCuc, {foreignKey: 'BuuCucId'});  
    DonHang.belongsTo(models.ChuoiGiaoHang, {foreignKey: 'ChuoiGiaoHangId'}); 
    DonHang.belongsTo(models.NguoiDung, {foreignKey: 'NguoiDungId'});
    DonHang.belongsTo(models.DiaChi, {foreignKey: 'DiaChiId'});  
  };
  return DonHang;
};