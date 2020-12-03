'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            {
                "TenSanPham": "Kem Đánh Răng",
                "MoTa": " Hơi thở the mát",
                "Gia": "17000",
                "SoLuong": 30,
                "KichCo": "20",
                "KhoiLuong": "3",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 1
            },
            {
                "TenSanPham": "Kem Đánh Răng",
                "MoTa": " Hơi thở the mát",
                "Gia": "17000",
                "SoLuong": 30,
                "KichCo": "20",
                "KhoiLuong": "3",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 1
            },
            {
                "TenSanPham": "Nước Rửa Chén",
                "MoTa": "Sạch Sẽ chén bát",
                "Gia": "36000",
                "SoLuong": 30,
                "KichCo": "40",
                "KhoiLuong": "5",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 1
            },
            {
                "TenSanPham": "Nước Lau Sàn",
                "MoTa": "Sạch Sẽ Sàn Nhà",
                "Gia": "40000",
                "SoLuong": 30,
                "KichCo": "40",
                "KhoiLuong": "5",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 1
            },
            {
                "TenSanPham": "Dầu Ăn",
                "MoTa": "Dầu Thực Vật",
                "Gia": "29000",
                "SoLuong": 30,
                "KichCo": "15",
                "KhoiLuong": "3",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 1
            },
            {
                "TenSanPham": "Nước Nắm",
                "MoTa": "Nước Mắm Thơm Ngon",
                "Gia": "22000",
                "SoLuong": 30,
                "KichCo": "17",
                "KhoiLuong": "3",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 1
            },
            {
                "TenSanPham": "TiVi",
                "MoTa": "TV Siêu Bự",
                "Gia": "16000000",
                "SoLuong": 10,
                "KichCo": "120",
                "KhoiLuong": "15",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 1
            },
            {
                "TenSanPham": "TiVi",
                "MoTa": "TV Siêu Bự",
                "Gia": "16000000",
                "SoLuong": 10,
                "KichCo": "120",
                "KhoiLuong": "15",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 2
            },
            {
                "TenSanPham": "Điện Thoại",
                "MoTa": "Chơi Game siêu mượt",
                "Gia": "4000000",
                "SoLuong": 10,
                "KichCo": "10",
                "KhoiLuong": "3",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 2
            },
            {
                "TenSanPham": "Máy chơi Game",
                "MoTa": "Chơi Game siêu mượt",
                "Gia": "1000000",
                "SoLuong": 10,
                "KichCo": "30",
                "KhoiLuong": "5",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 2
            },
            {
                "TenSanPham": "Laptop",
                "MoTa": "Chơi Game siêu mượt",
                "Gia": "1000000",
                "SoLuong": 10,
                "KichCo": "50",
                "KhoiLuong": "10",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 2
            },
            {
                "TenSanPham": "Laptop",
                "MoTa": "Chơi Game siêu mượt",
                "Gia": "19000000",
                "SoLuong": 10,
                "KichCo": "50",
                "KhoiLuong": "10",
                "DanhGia": "5 sao",
                "NgayCapNhat": null,
                "KhuyenMai": null,
                "LoaiSanPhamId": 2
            },
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('SanPhams', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('SanPhams', data, {});
    }
};