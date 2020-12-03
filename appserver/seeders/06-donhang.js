'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            {
                "NgayDatHang": "2020-12-02T09:39:43.020Z",
                "TienVanChuyen": "100",
                "TongTien": "39100",
                "TinhTrangDon": null,
                "NguoiDungId": 2,
                "BuuCucId": null,
                "ChuoiGiaoHangId": null,
                "DiaChiId": 4,
                "GhiChu": "",
                "DanhGia": "",
                "daThanhToan": null                
            },
            {
                "NgayDatHang": "2020-12-03T07:19:40.819Z",
                "TienVanChuyen": "100",
                "TongTien": "5000100",
                "TinhTrangDon": null,
                "NguoiDungId": 1,
                "BuuCucId": null,
                "ChuoiGiaoHangId": null,
                "DiaChiId": 3,
                "GhiChu": "",
                "DanhGia": "",
                "daThanhToan": null                
            },
            {
                "NgayDatHang": "2020-12-03T07:22:51.203Z",
                "TienVanChuyen": "100",
                "TongTien": "76100",
                "TinhTrangDon": null,
                "NguoiDungId": 1,
                "BuuCucId": null,
                "ChuoiGiaoHangId": null,
                "DiaChiId": 6,
                "GhiChu": "",
                "DanhGia": "",
                "daThanhToan": null                
            },
            {
                "NgayDatHang": "2020-12-03T07:33:33.799Z",
                "TienVanChuyen": "100",
                "TongTien": "51100",
                "TinhTrangDon": null,
                "NguoiDungId": 4,
                "BuuCucId": null,
                "ChuoiGiaoHangId": null,
                "DiaChiId": 8,
                "GhiChu": "",
                "DanhGia": "",
                "daThanhToan": null              
            },
            {
                "NgayDatHang": "2020-12-03T07:36:53.836Z",
                "TienVanChuyen": "100",
                "TongTien": "1000100",
                "TinhTrangDon": null,
                "NguoiDungId": 5,
                "BuuCucId": null,
                "ChuoiGiaoHangId": null,
                "DiaChiId": 9,
                "GhiChu": "",
                "DanhGia": "",
                "daThanhToan": null
            },
            {
                "NgayDatHang": "2020-12-03T07:40:40.525Z",
                "TienVanChuyen": "100",
                "TongTien": "4000100",
                "TinhTrangDon": null,
                "NguoiDungId": 6,
                "BuuCucId": null,
                "ChuoiGiaoHangId": null,
                "DiaChiId": 10,
                "GhiChu": "",
                "DanhGia": "",
                "daThanhToan": null
            },
            {
                "NgayDatHang": "2020-12-03T07:47:43.840Z",
                "TienVanChuyen": "100",
                "TongTien": "51100",
                "TinhTrangDon": null,
                "NguoiDungId": 7,
                "BuuCucId": null,
                "ChuoiGiaoHangId": null,
                "DiaChiId": 13,
                "GhiChu": "",
                "DanhGia": "",
                "daThanhToan": null
            },
            {
                "NgayDatHang": "2020-12-03T07:53:13.757Z",
                "TienVanChuyen": "100",
                "TongTien": "1000100",
                "TinhTrangDon": null,
                "NguoiDungId": 8,
                "BuuCucId": null,
                "ChuoiGiaoHangId": null,
                "DiaChiId": 14,
                "GhiChu": "",
                "DanhGia": "",
                "daThanhToan": null
            }];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('DonHangs', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('DonHangs', data, {});
    }
};