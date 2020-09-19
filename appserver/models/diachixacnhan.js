'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiaChiXacNhan = sequelize.define('DiaChiXacNhan', {
    ThoiGianUocLuong: DataTypes.STRING
  }, {});
  DiaChiXacNhan.associate = function(models) {
    DiaChiXacNhan.belongsTo(models.DiaChi, {foreignKey: 'DiaChiId'});      
    DiaChiXacNhan.belongsTo(models.NguoiDung, {foreignKey: 'NguoiDungId'});  
  };
  return DiaChiXacNhan;
};