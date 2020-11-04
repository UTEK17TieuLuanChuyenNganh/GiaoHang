'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiaChi = sequelize.define('DiaChi', {
    TenDiaChi: DataTypes.STRING,
    KinhDo: DataTypes.STRING,
    ViDo: DataTypes.STRING,
    ThoiGianBatDau: DataTypes.DATE,
    ThoiGianKetThuc: DataTypes.DATE,
    DonhangId: DataTypes.STRING,
    laMacDinh: DataTypes.BOOLEAN
  }, {});
  DiaChi.associate = function (models) {
    DiaChi.belongsTo(models.NguoiDung, { foreignKey: 'NguoiDungId' });
    DiaChi.hasMany(models.DonHang, { as: 'diachi_donhang' });
  };
  return DiaChi;
};