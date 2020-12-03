'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            {
                "CMND": "281195972",
                "STK": "1231231231231",
                "Diem": "10",
                "PhuongTienVanChuyen": "Xe Máy Blade",
                "NguoiDungId": 3
            }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('Shippers', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Shippers', data, {});
    }
};