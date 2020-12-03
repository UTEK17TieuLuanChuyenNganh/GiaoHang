'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            {
                "TenDiaChi": "214 Đường Tam Bình, Tam Phú, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam",
                "KinhDo": "106.7396867",
                "ViDo": "10.8579009",
                "ThoiGianBatDau": "2020-12-05T07:00:00.000Z",
                "ThoiGianKetThuc": "2020-12-05T11:30:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 2,
                "DonhangId": "1"
            },
            {
                "TenDiaChi": "13 Đ.số 19, Phước Linh Tây, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.7543541",
                "ViDo": "10.8602205",
                "ThoiGianBatDau": "2020-12-10T08:20:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T11:50:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 1,
                "DonhangId": "2"
            },
            {
                "TenDiaChi": "1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.7555778",
                "ViDo": "10.8513154",
                "ThoiGianBatDau": "2020-12-10T11:55:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T16:01:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 1,
                "DonhangId": "2"
            },
            {
                "TenDiaChi": "312 Lê Văn Việt, Tăng Nhơn Phú B, Quận 9, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.7850726",
                "ViDo": "10.8442463",
                "ThoiGianBatDau": "2020-12-10T17:02:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T20:02:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 1,
                "DonhangId": "2"
            },
            {
                "TenDiaChi": "24 Đường số 21, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.764479",
                "ViDo": "10.8556396",
                "ThoiGianBatDau": "2020-12-10T09:00:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T13:21:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 1,
                "DonhangId": "3"
            },
            {
                "TenDiaChi": "48 Đ. Phạm Văn Đồng, Hiệp Bình Chánh, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.7253045",
                "ViDo": "10.8314351",
                "ThoiGianBatDau": "2020-12-10T15:00:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T19:22:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 1,
                "DonhangId": "3"
            },
            {
                "TenDiaChi": "67 Đình Phong Phú, Tăng Nhơn Phú B, Quận 9, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.7815155",
                "ViDo": "10.8409789",
                "ThoiGianBatDau": "2020-12-10T07:31:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T14:31:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 4,
                "DonhangId": "4"
            },
            {
                "TenDiaChi": "78 Đường Đỗ Xuân Hợp, Phước Long B, Quận 9, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.771092",
                "ViDo": "10.82399",
                "ThoiGianBatDau": "2020-12-10T12:13:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T17:33:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 4,
                "DonhangId": "4"
            },
            {
                "TenDiaChi": "3 Đ. Tô Ngọc Vân, Linh Đông, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.751084",
                "ViDo": "10.854123",
                "ThoiGianBatDau": "2020-12-10T10:15:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T14:36:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 5,
                "DonhangId": "5"
            },
            {
                "TenDiaChi": "Đường số 47, Hiệp Bình Chánh, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.7226516",
                "ViDo": "10.8327478",
                "ThoiGianBatDau": "2020-12-10T08:39:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T11:39:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 6,
                "DonhangId": "6"
            },
            {
                "TenDiaChi": "45 Đ. Tô Ngọc Vân, Linh Đông, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.7532161",
                "ViDo": "10.8515007",
                "ThoiGianBatDau": "2020-12-10T11:40:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T16:40:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 6,
                "DonhangId": "6"
            },
            {
                "TenDiaChi": "23 Đường 3, Hiệp Bình Phước, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.7140999",
                "ViDo": "10.8414731",
                "ThoiGianBatDau": "2020-12-10T12:40:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T17:47:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 7,
                "DonhangId": "7"
            },
            {
                "TenDiaChi": "13 Đường 36, Linh Đông, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.7456521",
                "ViDo": "10.8398127",
                "ThoiGianBatDau": "2020-12-10T07:45:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T12:45:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 7,
                "DonhangId": "7"
            },
            {
                "TenDiaChi": "360 Đ. Phan Văn Trị, Phường 11, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam",
                "KinhDo": "106.6942567",
                "ViDo": "10.8219012",
                "ThoiGianBatDau": "2020-12-10T10:00:00.000Z",
                "ThoiGianKetThuc": "2020-12-10T14:52:00.000Z",
                "laMacDinh": true,
                "NguoiDungId": 8,
                "DonhangId": "8"
            }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('DiaChis', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('DiaChis', data, {});
    }
};