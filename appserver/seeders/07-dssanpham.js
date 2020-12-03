'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            {
                "SoLuong": 1,
                "DonHangId": 1,
                "SanPhamId": 2
            },
            {
                "SoLuong": 1,
                "DonHangId": 1,
                "SanPhamId": 6
            },
            {
                "SoLuong": 1,
                "DonHangId": 2,
                "SanPhamId": 10
            },
            {
                "SoLuong": 1,
                "DonHangId": 2,
                "SanPhamId": 9
            },
            {
                "SoLuong": 1,
                "DonHangId": 3,
                "SanPhamId": 3
            },
            {
                "SoLuong": 1,
                "DonHangId": 3,
                "SanPhamId": 4
            },
            {
                "SoLuong": 1,
                "DonHangId": 4,
                "SanPhamId": 5
            },
            {
                "SoLuong": 1,
                "DonHangId": 4,
                "SanPhamId": 6
            },
            {
                "SoLuong": 1,
                "DonHangId": 5,
                "SanPhamId": 10
            },
            {
                "SoLuong": 1,
                "DonHangId": 6,
                "SanPhamId": 9
            },
            {
                "SoLuong": 1,
                "DonHangId": 7,
                "SanPhamId": 5
            },
            {
                "SoLuong": 1,
                "DonHangId": 7,
                "SanPhamId": 6
            },
            {
                "SoLuong": 1,
                "DonHangId": 8,
                "SanPhamId": 10
            }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('DSSanPhams', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('DSSanPhams', data, {});
    }
};