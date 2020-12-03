'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            {
                "HoTen": "Nguyễn Văn A",
                "SinhNhat": "1996-12-19T00:00:00.000Z",
                "GioiTinh": "nam",
                "Avatar": "",
                "Email": "quyen123@gmail.com",
                "SDT": "0987654896",
                "Username": "quyen123",
                "Password": "MTIz",
                "laShop": false
            },
            {
                "HoTen": "ntl",
                "SinhNhat": "2020-12-02T00:00:00.000Z",
                "GioiTinh": "Nam",
                "Avatar": "",
                "Email": "",
                "SDT": "09123456789",
                "Username": "ntl123",
                "Password": "MTIz",
                "laShop": false
            },
            {
                "HoTen": "Trần Cao Quyền",
                "SinhNhat": "1999-01-04T00:00:00.000Z",
                "GioiTinh": "Nam",
                "Avatar": "",
                "Email": "Caoquyen1913@gmail.com",
                "SDT": "0987513566",
                "Username": "caoquyen1913",
                "Password": "MTIz",
                "laShop": false
            }, {
                "HoTen": "Trần Văn B",
                "SinhNhat": "1964-12-17T00:00:00.000Z",
                "GioiTinh": "Nam",
                "Avatar": "",
                "Email": "B@gmail.com",
                "SDT": "0779954732",
                "Username": "quyen1",
                "Password": "MTIz",
                "laShop": false
            },
            {
                "HoTen": "Trần Văn C",
                "SinhNhat": "1989-12-20T00:00:00.000Z",
                "GioiTinh": "Nam",
                "Avatar": "",
                "Email": "C@gmail.com",
                "SDT": "06794588468",
                "Username": "quyen2",
                "Password": "MTIz",
                "laShop": false
            },
            {
                "HoTen": "Nguyễn Thị D",
                "SinhNhat": "1999-12-03T00:00:00.000Z",
                "GioiTinh": "Nữ",
                "Avatar": "",
                "Email": "D@gmail.com",
                "SDT": "0987648372",
                "Username": "quyen3",
                "Password": "MTIz",
                "laShop": false
            },
            {
                "HoTen": "Võ Văn E",
                "SinhNhat": "1975-12-30T00:00:00.000Z",
                "GioiTinh": "Nam",
                "Avatar": "",
                "Email": "E@gmail.com",
                "SDT": "0775748275",
                "Username": "quyen4",
                "Password": "MTIz",
                "laShop": false
            },
            {
                "HoTen": "Trần Văn F",
                "SinhNhat": "1979-12-20T00:00:00.000Z",
                "GioiTinh": "Nam",
                "Avatar": "",
                "Email": "F@gmail.com",
                "SDT": "0987574926",
                "Username": "quyen5",
                "Password": "MTIz",
                "laShop": false
            }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('NguoiDungs', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('NguoiDungs', data, {});
    }
};