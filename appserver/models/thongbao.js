'use strict';
module.exports = (sequelize, DataTypes) => {
    const ThongBao = sequelize.define('ThongBao', {
        NoiDung: DataTypes.STRING,
        Type: DataTypes.STRING,
        isNew: DataTypes.BOOLEAN
    }, {});
    ThongBao.associate = function (models) {
        ThongBao.belongsTo(models.NguoiDung, { foreignKey: 'NguoiDungId' });
    };
    return ThongBao;
};