'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shipper = sequelize.define('Shipper', {
    CMND: DataTypes.STRING,
    STK: DataTypes.STRING,
    Diem: DataTypes.DECIMAL,
    PhuongTienVanChuyen: DataTypes.STRING
  }, {});
  Shipper.associate = function(models) {
    Shipper.hasMany(models.ChuoiGiaoHang, { as: 'shipper-chuoigiaohang' }); 
    Shipper.belongsTo(models.NguoiDung, {foreignKey: 'NguoiDungId'});
  };
  return Shipper;
};