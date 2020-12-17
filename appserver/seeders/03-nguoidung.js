'use strict';
module.exports = {
   up: (queryInterface, Sequelize) => {
      let data = [
         { 'HoTen': 'Nguyễn Văn A', 'SinhNhat': '1996-12-19T00:00:00.000Z', 'GioiTinh': 'nam', 'Avatar': '', 'Email': 'quyen123@gmail.com', 'SDT': '0987654896', 'Username': 'quyen123', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'ntl', 'SinhNhat': '2020-12-02T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': '', 'SDT': '09123456789', 'Username': 'ntl123', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Trần Cao Quyền', 'SinhNhat': '1999-01-04T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'Caoquyen1913@gmail.com', 'SDT': '0987513566', 'Username': 'caoquyen1913', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Trần Văn B', 'SinhNhat': '1964-12-17T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'B@gmail.com', 'SDT': '0779954732', 'Username': 'quyen1', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Trần Văn C', 'SinhNhat': '1989-12-20T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'C@gmail.com', 'SDT': '06794588468', 'Username': 'quyen2', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Nguyễn Thị D', 'SinhNhat': '1999-12-03T00:00:00.000Z', 'GioiTinh': 'Nữ', 'Avatar': '', 'Email': 'D@gmail.com', 'SDT': '0987648372', 'Username': 'quyen3', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Võ Văn E', 'SinhNhat': '1975-12-30T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'E@gmail.com', 'SDT': '0775748275', 'Username': 'quyen4', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Trần Văn F', 'SinhNhat': '1979-12-20T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'F@gmail.com', 'SDT': '0987574926', 'Username': 'quyen5', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },         
         { 'HoTen': 'Trần Cao Quý', 'SinhNhat': '1999-01-04T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'Caoquy1913@gmail.com', 'SDT': '0987513566', 'Username': 'caoquy1913', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Nguyễn Văn G', 'SinhNhat': '1972-12-17T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'G@gmail.con', 'SDT': '0986793717', 'Username': 'quyen6', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Trần Văn H', 'SinhNhat': '1990-12-22T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'H@gmail.con', 'SDT': '0357836548', 'Username': 'quyen7', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Lê Văn I', 'SinhNhat': '1984-12-23T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'I@gmail.com', 'SDT': '0985738296', 'Username': 'quyen8', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Nguyễn Thị J', 'SinhNhat': '1986-12-26T00:00:00.000Z', 'GioiTinh': 'Nữ', 'Avatar': '', 'Email': 'J@gmail.com', 'SDT': '0357288097', 'Username': 'quyen9', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Trần Văn K', 'SinhNhat': '1979-12-22T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'K@gmail.com', 'SDT': '0987578543', 'Username': 'quyen10', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Lê Thị L', 'SinhNhat': '1988-12-23T00:00:00.000Z', 'GioiTinh': 'Nữ', 'Avatar': '', 'Email': 'L@gmail.com', 'SDT': '0895742689', 'Username': 'quyen11', 'Password': 'MTIz', 'laShop': false, 'isDisable': false },
         { 'HoTen': 'Nguyễn Văn M', 'SinhNhat': '1990-12-06T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'M@gmail.com', 'SDT': '0987578908', 'Username': 'quyen12', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Nguyễn Văn N', 'SinhNhat': '1989-12-06T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'N@gmail.com', 'SDT': '0336795479', 'Username': 'quyen13', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Lê Thị O', 'SinhNhat': '1987-12-31T00:00:00.000Z', 'GioiTinh': 'Nữ', 'Avatar': '', 'Email': 'O@gmail.com', 'SDT': '0357865346', 'Username': 'quyen14', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Trần Văn P', 'SinhNhat': '1991-12-06T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'P@gmail.com', 'SDT': '09876479468', 'Username': 'quyen15', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Trần Văn Q', 'SinhNhat': '1979-12-30T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'Q@gmail.com', 'SDT': '0986476489', 'Username': 'quyen16', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Nguyễn Thị R', 'SinhNhat': '1989-12-22T00:00:00.000Z', 'GioiTinh': 'Nữ', 'Avatar': '', 'Email': 'R@gmail.com', 'SDT': '0987685793', 'Username': 'quyen17', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Lê Thị S', 'SinhNhat': '1975-12-17T00:00:00.000Z', 'GioiTinh': 'Nữ', 'Avatar': '', 'Email': 'S@gmail.com', 'SDT': '0985378778', 'Username': 'quyen18', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Trần Văn U', 'SinhNhat': '1987-12-17T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'U@gmail.com', 'SDT': '0987589988', 'Username': 'quyen19', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Nguyễn thị V', 'SinhNhat': '1988-12-26T00:00:00.000Z', 'GioiTinh': 'Nữ', 'Avatar': '', 'Email': 'V@gmail.com', 'SDT': '0357865689', 'Username': 'quyen20', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Võ Thị T', 'SinhNhat': '1995-12-06T00:00:00.000Z', 'GioiTinh': 'Nữ', 'Avatar': '', 'Email': 'T@gmail.com', 'SDT': '0335894759', 'Username': 'quyen21', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Lê Văn X', 'SinhNhat': '1994-12-06T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'X@gmail.con', 'SDT': '0987659087', 'Username': 'quyen22', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Vũ Văn W', 'SinhNhat': '1981-12-06T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'W@gmail.com', 'SDT': '0987897492', 'Username': 'quyen23', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Trần Văn Y', 'SinhNhat': '1993-12-06T00:00:00.000Z', 'GioiTinh': 'Nam', 'Avatar': '', 'Email': 'Y@gmail.com', 'SDT': '0337905828', 'Username': 'quyen24', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }, 
         { 'HoTen': 'Ngô Thị Z', 'SinhNhat': '1987-12-06T00:00:00.000Z', 'GioiTinh': 'Nữ', 'Avatar': '', 'Email': 'Z@gmail.com', 'SDT': '0987684907', 'Username': 'quyen25', 'Password': 'MTIz', 'laShop': false, 'isDisable': false }];
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
