'use strict';
   module.exports = {
up: (queryInterface, Sequelize) => {
let data =[{'TenLoai': 'Gia Dụng', 'Hinh': null, 'MoTa': 'Sản Phẩm Gia Dụng'}, {'TenLoai': 'Điện Tử', 'Hinh': null, 'MoTa': 'Đồ Điện Tử'}];
data.map(item => {item.createdAt = Sequelize.literal('NOW()');
item.updatedAt = Sequelize.literal('NOW()');
   return item;
});
return queryInterface.bulkInsert('LoaiSanPhams', data, {});
},
down: (queryInterface, Sequelize) => {
 return queryInterface.bulkInsert('LoaiSanPhams', data, {});
   }
};
